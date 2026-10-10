import React, {useContext} from 'react';
import { View, Image, Platform } from '../primitives';
import PropTypes from 'prop-types';
import ThemeContext from '../ThemeContext';

import * as Icons from 'lucide-react';

/**
 * Icon component that provides consistent iconography using the Lucide icon set.
 * Supports multiple sizes and integrates with the design system's color theming.
 * 
 * Lucide is the maintained successor to Feather. Every Feather name used by
 * Cinderblock still resolves, either directly or through Lucide's aliases
 * (for example `Edit` renders `SquarePen`).
 * 
 * @param {Object} props - Component props
 * @param {string} props.shape - PascalCase Lucide icon name (e.g., 'Home', 'User', 'Settings')
 * @param {('xsmall'|'small'|'medium'|'large'|'xlarge')} [props.size='medium'] - Icon size
 * @param {string} [props.color] - Icon color (defaults to textSecondary theme color)
 * @param {Object} [props.style] - Additional styles to apply
 * 
 * @example
 * // Basic icon usage
 * <Icon shape="Home" />
 * <Icon shape="User" size="large" />
 * <Icon shape="Settings" color="#007bff" />
 * 
 * @example
 * // Icons in buttons and interactive elements
 * <Button>
 *   <Icon shape="Plus" size="small" />
 *   Add Item
 * </Button>
 * 
 * @example
 * // Icons with text for labels and navigation
 * <Flex align="center">
 *   <FlexItem shrink><Icon shape="Mail" size="small" /></FlexItem>
 *   <FlexItem><Text>Messages</Text></FlexItem>
 * </Flex>
 * 
 * @example
 * // Status and feedback icons with color coding
 * <Icon shape="CircleCheck" color={SWATCHES.success} />
 * <Icon shape="CircleAlert" color={SWATCHES.warning} />
 * <Icon shape="CircleX" color={SWATCHES.error} />
 */
const Icon = (props) => {
	const { styles, SWATCHES } = useContext(ThemeContext);
		const {
			color = SWATCHES.textSecondary,  // Default to secondary text color
			size = 'medium',                 // Size variant
			shape,                           // PascalCase Lucide icon name
			style,
			...other
		} = props;

		// Size mapping from semantic names to pixel values
		const SIZES = {
			xsmall: 14,   // Small inline icons
			small: 16,    // Button icons, form labels
			medium: 24,   // Standard UI icons
			large: 36,    // Feature highlights, empty states
			xlarge: 64    // Hero sections, large illustrations
		}
		const pixelSize = SIZES[size];

		// Look up the named icon component from lucide-react
		const ThisIcon = Icons[shape];
		if (!ThisIcon) {
			if (process.env.NODE_ENV !== 'production') {
				console.warn(`Icon: no Lucide icon named "${shape}".`);
			}
			return null;
		}

		// Lucide marks icons aria-hidden by default; label the surrounding
		// control (or pass aria-label) when an icon carries meaning.
		return <ThisIcon color={color} size={pixelSize} style={style} {...other} />;

}


Icon.propTypes = {
	size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
	shape: PropTypes.string,
	color: PropTypes.string
}

export default Icon;