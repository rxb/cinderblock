import React, {useContext} from 'react';
import { View, Image, Text } from '../primitives';
import PropTypes from 'prop-types';
import ThemeContext from '../ThemeContext';

/**
 * Responsive image component that provides consistent sizing and responsive behavior.
 * Handles image display with design system integration and responsive media queries.
 * 
 * Picture provides standard image sizes that work well across the design system
 * and automatically applies responsive styling based on the chosen size variant.
 * 
 * @param {Object} props - Component props
 * @param {('xsmall'|'small'|'medium'|'large'|'xlarge'|false)} [props.size='medium'] - Image size variant
 * @param {Object} props.source - Image source object with uri (e.g., {uri: 'https://...'})
 * @param {Object} [props.style] - Additional styles to apply
 * 
 * @example
 * // Basic image usage
 * <Picture 
 *   source={{uri: 'https://example.com/image.jpg'}} 
 *   size="medium" 
 * />
 * 
 * @example
 * // Profile avatars and thumbnails
 * <Picture 
 *   source={{uri: user.avatarUrl}} 
 *   size="small"
 * />
 * 
 * @example
 * // Hero images and featured content
 * <Picture 
 *   source={{uri: article.featuredImage}} 
 *   size="large"
 * />
 * 
 * @example
 * // Product gallery with responsive sizing
 * <List 
 *   items={products}
 *   renderItem={(product) => (
 *     <Card>
 *       <Picture 
 *         source={{uri: product.image}} 
 *         size="medium"
 *       />
 *       <Chunk><Text>{product.name}</Text></Chunk>
 *     </Card>
 *   )}
 * />
 * 
 * @example
 * // Custom sizing with style override
 * <Picture 
 *   source={{uri: '/custom-image.jpg'}} 
 *   size="medium"
 *   style={{borderRadius: 8}}
 * />
 */
const Picture = (props) => {
	const { styles, ids } = useContext(ThemeContext);
	
	const {
		size,       // Size variant for responsive behavior
		source,     // Image source object with uri
		style       // Additional custom styles
	} = props;

	// Combine base styles, size-specific styles, and custom styles
	const finalStyles = [
		styles['picture'],              // Base picture styles
		styles[`picture--${size}`],    // Size-specific responsive styles
		style
	];

	return(
		<Image
			source={source}
			style={finalStyles}
			dataSet={{ media: ids[`picture--${size}`] }}  // Responsive media query application
			/>
	);
}

Picture.defaultProps = {
	size: 'medium',
};

Picture.propTypes = {
	size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', false]),
	source: PropTypes.object
}

export default Picture;