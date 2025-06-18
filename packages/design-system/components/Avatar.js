import React, {useContext} from 'react';
import { View, Image, Text } from '../primitives';
import PropTypes from 'prop-types';
import ThemeContext from '../ThemeContext';

/**
 * User profile image component with consistent sizing and responsive behavior.
 * Provides circular image display optimized for user representation across the interface.
 * 
 * Avatar handles image sizing, circular cropping, and responsive scaling for user profile
 * images. It's designed to maintain consistent user identification across different
 * interface contexts from compact lists to detailed profile sections.
 * 
 * @param {Object} props - Component props
 * @param {('xsmall'|'small'|'mid'|'medium'|'large'|'xlarge')} [props.size='medium'] - Avatar size variant
 * @param {Object} props.source - Image source object with uri (e.g., {uri: 'https://...'})
 * @param {Object} [props.style] - Additional styles to apply
 * 
 * @example
 * // Basic user avatar
 * <Avatar 
 *   source={{uri: user.profileImageUrl}} 
 *   size="medium" 
 * />
 * 
 * @example
 * // Small avatar for lists and compact layouts
 * <Flex align="center">
 *   <FlexItem shrink>
 *     <Avatar source={{uri: comment.author.avatar}} size="small" />
 *   </FlexItem>
 *   <FlexItem>
 *     <Text weight="strong">{comment.author.name}</Text>
 *     <Text color="secondary">{comment.text}</Text>
 *   </FlexItem>
 * </Flex>
 * 
 * @example
 * // Large avatar for profile headers
 * <Section>
 *   <Chunk>
 *     <Avatar source={{uri: user.avatar}} size="xlarge" />
 *   </Chunk>
 *   <Chunk>
 *     <Text type="pageHead">{user.displayName}</Text>
 *     <Text color="secondary">{user.email}</Text>
 *   </Chunk>
 * </Section>
 * 
 * @example
 * // Avatar grid for team displays
 * <List 
 *   variant="grid" 
 *   itemsInRow={{mobile: 3, desktop: 6}}
 *   items={teamMembers}
 *   renderItem={(member) => (
 *     <Card>
 *       <Chunk><Avatar source={{uri: member.avatar}} size="large" /></Chunk>
 *       <Chunk><Text>{member.name}</Text></Chunk>
 *     </Card>
 *   )}
 * />
 */
const Avatar = (props) => {
	const { styles, ids } = useContext(ThemeContext);

	const {
		size,       // Size variant for different use cases
		source,     // Image source object with uri
		style       // Additional custom styles
	} = props;

	// Combine base avatar styles, size-specific styles, and custom styles
	const finalStyles = [
		styles['avatar'],              // Base avatar styles (circular, border)
		styles[`avatar--${size}`],    // Size-specific dimensions and responsive behavior
		style
	];
	
	return(
		<Image
			source={source}
			style={finalStyles}
			dataSet={{ media: ids[`avatar--${size}`] }}  // Responsive media query application
			/>
	);
}

Avatar.defaultProps = {
	size: 'medium',
};

Avatar.propTypes = {
	size: PropTypes.oneOf(['xsmall', 'small', 'mid', 'medium', 'large', 'xlarge']),
	source: PropTypes.object
}

export default Avatar;