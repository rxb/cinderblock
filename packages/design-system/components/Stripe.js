import React, {useMemo, useContext} from 'react';
import { View, Image, ImageBackground } from '../primitives';
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
 * Top-level structural component that creates major page sections with optional background images.
 * The largest unit in the Cinderblock hierarchy: Stripe > Section > Chunk.
 * 
 * Stripe defines major content areas of a page and provides responsive background image
 * support with adaptive heights. Multiple Stripes stack vertically to create page structure.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.image] - Background image URL for hero sections
 * @param {Object} [props.imageHeight] - Responsive heights: {small: 225, medium: 325, large: 400, xlarge: 450}
 * @param {boolean} [props.border] - Add border styling to the stripe
 * @param {Object} [props.style] - Additional styles to apply
 * @param {React.Ref} [props.forwardedRef] - Forwarded ref for the container
 * @param {React.ReactNode} props.children - Content sections to display
 * 
 * @example
 * // Basic content stripe
 * <Stripe>
 *   <Section>
 *     <Chunk><Text type="pageHead">Welcome</Text></Chunk>
 *     <Chunk><Text>Learn about our platform...</Text></Chunk>
 *   </Section>
 * </Stripe>
 * 
 * @example
 * // Hero stripe with background image
 * <Stripe 
 *   image="https://example.com/hero.jpg"
 *   imageHeight={{small: 300, large: 500}}
 * >
 *   <Section>
 *     <Bounds>
 *       <Chunk><Text type="pageHead" color="white">Hero Title</Text></Chunk>
 *       <Chunk><Button color="primary">Get Started</Button></Chunk>
 *     </Bounds>
 *   </Section>
 * </Stripe>
 * 
 * @example
 * // Multiple stripes for page structure
 * <>
 *   <Stripe image="/hero.jpg">
 *     <Section>{/* Hero content */}</Section>
 *   </Stripe>
 *   <Stripe>
 *     <Section>{/* Features content */}</Section>
 *   </Stripe>
 *   <Stripe style={{backgroundColor: '#f8f9fa'}}>
 *     <Section>{/* Testimonials content */}</Section>
 *   </Stripe>
 * </>
 */
const Stripe = (props) => {
	const { styles, ids } = useContext(ThemeContext);

	const {
		children,
		image,               // Background image URL
		border,              // Boolean - add border styling
		imageHeight = {small: 225, medium: 325, large: 400, xlarge: 450}, // Responsive heights
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
				source={{uri: image}}
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