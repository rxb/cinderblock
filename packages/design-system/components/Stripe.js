import React, {useContext} from 'react';
import { View } from '../primitives';
import ImageBackground from './ImageBackground';
import ThemeContext from '../ThemeContext';
import {useMediaContext} from './UseMediaContext';
import { BREAKPOINTS, METRICS } from '../styles/designConstants';
import {findWidestActiveValue} from '../utils';

/**
 * Generates CSS class names for Stripe component styling.
 * Handles responsive layout changes and media query application.
 * 
 * @param {Object} media - Current media query state from useMediaContext()
 * @param {Object} styles - Style object from ThemeContext
 * @returns {Array} Array of resolved CSS styles
 */
const getCombinedStyles = (media, styles) => {	
	const styleKeys = [
		'stripe',                                                    // Base stripe styles
		...[ (media && media.medium) ? 'stripe--atMedium' : undefined], // Medium breakpoint adjustments
	];
	return styleKeys.map((key)=>{
		return styles[key];
	});
}

/**
 * Page-owned structural component for a major full-width visual region.
 * The ordinary hierarchy inside it is Stripe > Bounds > Section > Chunk.
 * 
 * Stripe provides visual background context and responsive background-image
 * support with adaptive heights. Multiple Stripes may stack vertically, or
 * peer Stripes may sit in FlexItems for a responsive full-bleed split region.
 * Shared Page/application shells should render page-owned Stripes as children
 * rather than supplying one catch-all Stripe.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.image] - Background image URL for hero sections
 * @param {Object} [props.imageHeight] - Responsive heights: {small: 225, medium: 325, large: 400, xlarge: 450}
 * @param {string} [props.imageFit='cover'] - How the image scales within the stripe
 * @param {string|Object} [props.imagePosition='center'] - Image focal position, e.g. 'top' or {top: 0, left: '35%'}
 * @param {Object} [props.imageStyle] - Additional styles for the background image
 * @param {boolean} [props.border] - Add border styling to the stripe
 * @param {Object} [props.style] - Additional styles to apply
 * @param {React.Ref} [props.forwardedRef] - Forwarded ref for the container
 * @param {React.ReactNode} props.children - Content sections to display
 * 
 * @example
 * // Basic content stripe
 * <Stripe>
 *   <Bounds>
 *     <Section>
 *       <Chunk><Text type="pageHead">Welcome</Text></Chunk>
 *       <Chunk><Text>Learn about our platform...</Text></Chunk>
 *     </Section>
 *   </Bounds>
 * </Stripe>
 * 
 * @example
 * // Hero stripe with background image
 * <Stripe 
 *   image="https://example.com/hero.jpg"
 *   imageFit="cover"
 *   imagePosition="top"
 *   imageHeight={{small: 300, large: 500}}
 * >
 *   <Bounds>
 *     <Section>
 *       <Chunk><Text type="pageHead" color="white">Hero Title</Text></Chunk>
 *       <Chunk><Button color="primary">Get Started</Button></Chunk>
 *     </Section>
 *   </Bounds>
 * </Stripe>
 * 
 * @example
 * // Multiple stripes for page structure
 * <>
 *   <Stripe image="/hero.jpg">
 *     <Bounds><Section>// Hero content</Section></Bounds>
 *   </Stripe>
 *   <Stripe>
 *     <Bounds><Section>// Features content</Section></Bounds>
 *   </Stripe>
 *   <Stripe style={{backgroundColor: '#f8f9fa'}}>
 *     <Bounds><Section>// Testimonials content</Section></Bounds>
 *   </Stripe>
 * </>
 */
const Stripe = (props) => {
	const { styles, ids } = useContext(ThemeContext);

	const {
		children,
		image,               // Background image URL
		imageFit = 'cover',  // Cross-platform equivalent of object-fit
		border,              // Boolean - add border styling
		imageHeight = {small: 225, medium: 325, large: 400, xlarge: 450}, // Responsive heights
		imagePosition = 'center', // Cross-platform equivalent of object-position
		imageStyle,
		style,
		forwardedRef,        // Forwarded ref for container
		...other
	} = props

	// Use media queries for responsive image height (varies significantly across breakpoints)
	const media = useMediaContext();
	const imageHeightStyle = (image) ? {height: findWidestActiveValue(imageHeight, media)} : undefined;
	const borderStyle = (border) ? styles['stripe--border'] : undefined;

	// Render with background image if provided
	if(image){
		return(
			<ImageBackground
				ref={forwardedRef}
				source={image}
				contentFit={imageFit}
				contentPosition={imagePosition}
				imageStyle={imageStyle}
				style={[styles['stripe'], borderStyle, style, imageHeightStyle]}
				dataSet={{ media: ids['stripe']}} 
				{...other}
				>
				{children}
			</ImageBackground>
		);
	}
	// Render as standard container
	else{
		return(
			<View 
				ref={forwardedRef}
				style={[styles['stripe'], borderStyle, style]}
				dataSet={{ media: ids['stripe']}} 
				{...other}
				>
				{children}
			</View>
		);
	}
};

const WrappedComponent = React.forwardRef((props, ref) => {
	return <Stripe {...props} forwardedRef={ref} />;
});

export default WrappedComponent;
