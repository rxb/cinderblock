import React, {useContext} from 'react';
import { Text as ReactText } from '../primitives';
import ThemeContext from '../ThemeContext';
import {TEXT_TYPES, TEXT_COLORS, TEXT_WEIGHTS} from '../styles/designConstants';

/**
 * Determines appropriate accessibility props based on text type.
 * Automatically assigns heading roles and levels for semantic HTML.
 * 
 * @param {string} type - Text type ('pageHead', 'sectionHead', etc.)
 * @returns {Object} Accessibility props for the text element
 */
const getAccessibilityProps = (type) => {
	switch(type){
		case 'pageHead':
			return {
				accessibilityRole: 'heading'     // Maps to <h1> in web
			};
		case 'sectionHead':
			return {
				accessibilityRole: 'heading',   // Maps to <h2> in web
				accessibilityLevel: 2
			};
		default:
			return {};
	}
}


/**
 * Generates CSS class names for Text component styling.
 * Combines typography, color, weight, and layout modifiers.
 * 
 * @param {Object} props - Text component props
 * @param {Object} styles - Style object from ThemeContext
 * @param {Object} ids - Media query ID object from ThemeContext
 * @returns {Object} Object with activeStyles array and activeIds string
 */
const getActiveStyles = (props, styles, ids) => {

	const {
		inverted,           // Boolean - use inverted color scheme
		type = "body",      // Typography scale: 'pageHead', 'sectionHead', 'body', 'small', etc.
		color = "primary",  // Color theme: 'primary', 'secondary', 'error', 'success', etc.
		nowrap = false,     // Boolean - prevent text wrapping (white-space: nowrap)
		chunk = false,      // Boolean - add chunk spacing (when used outside Chunk component)
		weight,             // Font weight: 'light', 'normal', 'strong', 'heavy'
	} = props;

	const invertedModifier = (inverted) ? '--inverted' : '';
	
	// Build CSS class array based on props
	const styleKeys = [
		'text',                    // Base text styles
		...[type ? `text${TEXT_TYPES[type]}` : undefined ],        // Typography scale (fontSize, lineHeight)
		...[color ? `text${TEXT_COLORS[color]}${invertedModifier}` : undefined ], // Color theming
		...[weight ? `text${TEXT_WEIGHTS[weight]}` : undefined ],  // Font weight
		...[nowrap ? `textNowrap` : undefined],                    // Layout modifier
		...[chunk ? `chunk` : undefined],                          // Spacing modifier
	];

	return {
		activeStyles: styleKeys.map((key)=>{
			return styles[key];
		}),
		activeIds: styleKeys.map((key)=>{
			return ids[key];
		}).join(' ')
	}
}

/**
 * Typography component that provides consistent text styling across the design system.
 * Handles semantic heading levels, color theming, font weights, and layout modifiers.
 * 
 * @param {Object} props - Component props
 * @param {('pageHead'|'sectionHead'|'body'|'small'|'big')} [props.type='body'] - Typography scale and semantic meaning
 * @param {('primary'|'secondary'|'error'|'success'|'warning')} [props.color='primary'] - Color theme
 * @param {('light'|'normal'|'strong'|'heavy')} [props.weight] - Font weight
 * @param {boolean} [props.inverted] - Use inverted color scheme for dark backgrounds
 * @param {boolean} [props.nowrap] - Prevent text wrapping (white-space: nowrap)
 * @param {boolean} [props.chunk] - Add chunk spacing when used outside Chunk component
 * @param {Object} [props.style] - Additional styles to apply
 * @param {string} [props.styleIds] - Additional CSS class IDs for media queries
 * @param {React.ReactNode} props.children - Text content to display
 * 
 * @example
 * // Page heading with semantic h1
 * <Text type="pageHead">Welcome to Our Platform</Text>
 * 
 * @example
 * // Section heading with semantic h2
 * <Text type="sectionHead" color="secondary">Features</Text>
 * 
 * @example
 * // Body text with weight and color
 * <Text weight="strong" color="error">Invalid input</Text>
 * 
 * @example
 * // Nowrap text for labels
 * <Text nowrap>Price: $99.99</Text>
 */
const Text = (props) => {
	const { 
		children, 
		style,
		styleIds="", 
		...other 
	} = props;

	const { styles, ids } = useContext(ThemeContext);
	const {activeStyles, activeIds} = getActiveStyles(props, styles, ids);

	const accessibilityProps = getAccessibilityProps(props.type);

	return(
		<ReactText
			style={[activeStyles, style]}
			dataSet={{ media: activeIds+" "+styleIds}}
			{...accessibilityProps}
			{...other}
			>
			{children}
		</ReactText>
	);
}


export default Text;