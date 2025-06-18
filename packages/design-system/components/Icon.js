import React, {useContext} from 'react';
import { View, Image, Platform } from '../primitives';
import PropTypes from 'prop-types';
import ThemeContext from '../ThemeContext';

import * as Icons from 'react-feather';

/**
 * Icon component that provides consistent iconography using the Feather icon set.
 * Supports multiple sizes and integrates with the design system's color theming.
 * 
 * Uses react-feather for a comprehensive set of clean, minimalist icons that work
 * well across different screen densities and themes.
 * 
 * @param {Object} props - Component props
 * @param {string} props.shape - Icon name from react-feather (e.g., 'home', 'user', 'settings')
 * @param {('xsmall'|'small'|'medium'|'large'|'xlarge')} [props.size='medium'] - Icon size
 * @param {string} [props.color] - Icon color (defaults to textSecondary theme color)
 * @param {Object} [props.style] - Additional styles to apply
 * 
 * @example
 * // Basic icon usage
 * <Icon shape="home" />
 * <Icon shape="user" size="large" />
 * <Icon shape="settings" color="#007bff" />
 * 
 * @example
 * // Icons in buttons and interactive elements
 * <Button>
 *   <Icon shape="plus" size="small" />
 *   Add Item
 * </Button>
 * 
 * @example
 * // Icons with text for labels and navigation
 * <Flex align="center">
 *   <FlexItem shrink><Icon shape="mail" size="small" /></FlexItem>
 *   <FlexItem><Text>Messages</Text></FlexItem>
 * </Flex>
 * 
 * @example
 * // Status and feedback icons with color coding
 * <Icon shape="check-circle" color={SWATCHES.success} />
 * <Icon shape="alert-circle" color={SWATCHES.warning} />
 * <Icon shape="x-circle" color={SWATCHES.error} />
 */
const Icon = (props) => {
	const { styles, SWATCHES } = useContext(ThemeContext);
		const {
			color = SWATCHES.textSecondary,  // Default to secondary text color
			size = 'medium',                 // Size variant
			shape,                           // Icon name from react-feather
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

		// Dynamically import the specific icon from react-feather
		const ThisIcon = Icons[shape];

		// Render the Feather icon with design system integration
		return <ThisIcon color={color} size={pixelSize} style={style} {...other} />;

}


Icon.propTypes = {
	size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
	shape: PropTypes.string,
	color: PropTypes.string
}

export default Icon;