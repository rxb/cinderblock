import React, {useContext} from 'react';
import { View, Image } from '../primitives';
import ThemeContext from '../ThemeContext';
import {useMediaContext} from './UseMediaContext';
import { findWidestActiveValue } from '../utils';

/**
 * Responsive image component with aspect ratio preservation and height control.
 * Displays images with responsive height breakpoints while maintaining aspect ratio.
 * 
 * ImageRatio provides responsive image display with customizable height breakpoints
 * for different screen sizes. It uses the findWidestActiveValue utility to select
 * the appropriate height based on the current media context, ensuring images
 * display optimally across all screen sizes.
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
 * // Basic responsive image
 * function ProductImage() {
 *   return (
 *     <ImageRatio
 *       image="https://example.com/product.jpg"
 *       imageHeight={{
 *         small: 200,
 *         medium: 300,
 *         large: 400,
 *         xlarge: 500
 *       }}
 *     />
 *   );
 * }
 * 
 * @example
 * // Hero image with overlay content
 * function HeroSection() {
 *   return (
 *     <ImageRatio
 *       image="https://example.com/hero-bg.jpg"
 *       imageHeight={{
 *         small: 300,
 *         medium: 400,
 *         large: 500,
 *         xlarge: 600
 *       }}
 *     >
 *       <View style={styles.heroOverlay}>
 *         <Section>
 *           <Chunk><Text type="title" color="white">Welcome to Our App</Text></Chunk>
 *           <Chunk><Text color="white">Discover amazing features</Text></Chunk>
 *           <Chunk>
 *             <Button onPress={handleGetStarted}>Get Started</Button>
 *           </Chunk>
 *         </Section>
 *       </View>
 *     </ImageRatio>
 *   );
 * }
 * 
 * @example
 * // Gallery with consistent responsive heights
 * function ImageGallery({ images }) {
 *   const galleryHeights = {
 *     small: 180,
 *     medium: 220,
 *     large: 260,
 *     xlarge: 300
 *   };
 * 
 *   return (
 *     <Section>
 *       <Flex direction="row" wrap>
 *         {images.map((image, index) => (
 *           <FlexItem key={image.id} basis="50%">
 *             <ImageRatio
 *               image={image.url}
 *               imageHeight={galleryHeights}
 *               style={{ margin: 4 }}
 *             >
 *               <Touch onPress={() => openImageModal(image)}>
 *                 <View style={styles.galleryOverlay}>
 *                   <Icon shape="Eye" color="white" />
 *                 </View>
 *               </Touch>
 *             </ImageRatio>
 *           </FlexItem>
 *         ))}
 *       </Flex>
 *     </Section>
 *   );
 * }
 * 
 * @example
 * // Article header with custom breakpoints
 * function ArticleHeader({ article }) {
 *   return (
 *     <ImageRatio
 *       image={article.featuredImage}
 *       imageHeight={{
 *         small: 160,   // Smaller for mobile articles
 *         medium: 220,
 *         large: 280,
 *         xlarge: 320
 *       }}
 *     >
 *       <View style={styles.articleHeaderOverlay}>
 *         <Section>
 *           <Chunk><Text type="title" color="white">{article.title}</Text></Chunk>
 *           <Chunk>
 *             <Text color="white" opacity={0.8}>
 *               {article.publishedAt} • {article.readTime} min read
 *             </Text>
 *           </Chunk>
 *         </Section>
 *       </View>
 *     </ImageRatio>
 *   );
 * }
 */


const ImageRatio = (props) => {
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
			style={[ style, styles.imageRatio, imageHeightStyle ]}
			dataSet={{ media: ids['imageRatio']}}
			>
			{children}
		</Image>
	);


}

export default ImageRatio;