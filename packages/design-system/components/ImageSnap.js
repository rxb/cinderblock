import React, {useContext} from 'react';
import { View, Image } from '../primitives';
import ThemeContext from '../ThemeContext';
import {useMediaContext} from './UseMediaContext';
import { findWidestActiveValue } from '../utils';

/**
 * Responsive image component with snap-to-edge behavior and height control.
 * Similar to ImageRatio but with different styling for edge-to-edge display.
 * 
 * ImageSnap provides responsive image display that "snaps" to container edges,
 * typically used for full-width images or backgrounds. It shares the same
 * responsive height system as ImageRatio but applies different styling
 * optimized for edge-to-edge presentation.
 * 
 * @param {Object} props - Component props
 * @param {string} props.image - Image URL to display
 * @param {Object} [props.imageHeight] - Height breakpoints object
 * @param {number} [props.imageHeight.small=250] - Height for small screens
 * @param {number} [props.imageHeight.medium=300] - Height for medium screens
 * @param {number} [props.imageHeight.large=350] - Height for large screens
 * @param {number} [props.imageHeight.xlarge=450] - Height for xlarge screens
 * @param {Object} [props.style] - Additional styles to apply
 * @param {boolean} [props.isFirstChild] - Whether this is the first child element
 * @param {React.ReactNode} [props.children] - Content to overlay on image
 * 
 * @example
 * // Full-width banner image
 * function BannerImage() {
 *   return (
 *     <ImageSnap
 *       image="https://example.com/banner.jpg"
 *       imageHeight={{
 *         small: 200,
 *         medium: 280,
 *         large: 360,
 *         xlarge: 440
 *       }}
 *     >
 *       <View style={styles.bannerContent}>
 *         <Text type="title" color="white">Special Offer</Text>
 *         <Button>Shop Now</Button>
 *       </View>
 *     </ImageSnap>
 *   );
 * }
 * 
 * @example
 * // Section background with edge-to-edge styling
 * function BackgroundSection({ backgroundImage, children }) {
 *   return (
 *     <ImageSnap
 *       image={backgroundImage}
 *       imageHeight={{
 *         small: 300,
 *         medium: 400,
 *         large: 500,
 *         xlarge: 600
 *       }}
 *     >
 *       <View style={styles.sectionOverlay}>
 *         <Section>
 *           {children}
 *         </Section>
 *       </View>
 *     </ImageSnap>
 *   );
 * }
 * 
 * @example
 * // Newsletter signup with background
 * function NewsletterSignup() {
 *   const [email, setEmail] = useState('');
 * 
 *   return (
 *     <ImageSnap
 *       image="https://example.com/newsletter-bg.jpg"
 *       imageHeight={{
 *         small: 250,
 *         medium: 300,
 *         large: 350,
 *         xlarge: 400
 *       }}
 *     >
 *       <View style={styles.newsletterOverlay}>
 *         <Section>
 *           <Chunk>
 *             <Text type="title" color="white" align="center">
 *               Stay Updated
 *             </Text>
 *           </Chunk>
 *           
 *           <Chunk>
 *             <Text color="white" align="center">
 *               Get the latest news and updates delivered to your inbox.
 *             </Text>
 *           </Chunk>
 *           
 *           <Chunk>
 *             <Flex direction="row" align="center">
 *               <FlexItem grow>
 *                 <TextInput
 *                   value={email}
 *                   onChange={setEmail}
 *                   placeholder="Enter your email"
 *                   style={styles.lightInput}
 *                 />
 *               </FlexItem>
 *               <FlexItem shrink>
 *                 <Button onPress={handleSubscribe}>
 *                   Subscribe
 *                 </Button>
 *               </FlexItem>
 *             </Flex>
 *           </Chunk>
 *         </Section>
 *       </View>
 *     </ImageSnap>
 *   );
 * }
 * 
 * @example
 * // Category showcase with edge styling
 * function CategoryShowcase({ categories }) {
 *   return (
 *     <Section>
 *       {categories.map(category => (
 *         <Chunk key={category.id}>
 *           <ImageSnap
 *             image={category.backgroundImage}
 *             imageHeight={{
 *               small: 160,
 *               medium: 200,
 *               large: 240,
 *               xlarge: 280
 *             }}
 *           >
 *             <Touch onPress={() => navigateToCategory(category.id)}>
 *               <View style={styles.categoryOverlay}>
 *                 <Text type="sectionHead" color="white">
 *                   {category.name}
 *                 </Text>
 *                 <Text color="white" opacity={0.9}>
 *                   {category.itemCount} items
 *                 </Text>
 *               </View>
 *             </Touch>
 *           </ImageSnap>
 *         </Chunk>
 *       ))}
 *     </Section>
 *   );
 * }
 */


const ImageSnap = (props) => {
	const { styles, ids } = useContext(ThemeContext);

	const {
		children,
		image,
		imageHeight = {small: 250, medium: 300, large: 350, xlarge: 450},
		style,
		isFirstChild
	} = props

	const media = useMediaContext();
	const imageHeightStyle = {height: findWidestActiveValue(imageHeight, media)};

	return(
		<Image
			source={{uri: image}}
			style={[ style, styles.imageSnap, imageHeightStyle ]}
			dataSet={{ media: ids['imageSnap']}}
			>
			{children}
		</Image>
	);


}

export default ImageSnap;