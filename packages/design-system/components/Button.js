import React, {useMemo, useContext, Fragment} from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text } from '../primitives';
import ThemeContext from '../ThemeContext';
import {getActiveStyles, getStyleKeysForMediaQueryVariants} from '../utils';

import {TEXT_TYPES} from '../styles/designConstants';
import Icon from './Icon';
import Link from './Link';
import Touch from './Touch';
import Bounce from './Bounce';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1); 

/**
 * Generates CSS class names for Button component styling.
 * Handles responsive variants that affect button width and behavior.
 * 
 * @param {Object} props - Button component props
 * @returns {Object} Object with buttonStyleKeys and textStyleKeys arrays
 */
const getStyleKeys = (props) => {

	const {
		color = 'primary',      // Button color theme ('primary', 'secondary', etc.)
		size = 'medium',        // Button size ('small', 'medium', 'large')
		inverted,               // Boolean - use inverted color scheme
		variant,                // Responsive variant object for width/behavior
	} = props;

	const invertedModifier = (inverted) ? 'Inverted' : '';
	
	// Map button size to text type for consistent typography
	const textType = {
		small: "small",
		medium: "body", 
		large: "big"
	}[size];

	// BUTTON CONTAINER STYLES
	// Generates classes like: 'button', 'button--medium', 'button--grow__small', 'button--primary'
	const buttonStyleKeys = [
		'button',                    // Base button styles
		`button--${size}`,          // Size-specific styles (padding, height, etc.)
		...getStyleKeysForMediaQueryVariants("button--", variant), // Responsive width behavior
		...[color ? `button--${color}${invertedModifier}` : undefined ] // Color theme styles
	];

	// BUTTON TEXT STYLES  
	// Generates classes like: 'text', 'textBody', 'buttonText', 'buttonText--primary'
	const textStyleKeys = [
		'text',                      // Base text styles
		...[textType ? `text${TEXT_TYPES[textType]}` : undefined ], // Size-based typography
		'buttonText',               // Button-specific text styles
		...getStyleKeysForMediaQueryVariants("buttonText--", variant), // Responsive text behavior
		...[color ? `buttonText--${color}${invertedModifier}` : undefined ], // Color-specific text styles
	];

	return { buttonStyleKeys, textStyleKeys }
}

const Button = (props) => {

	const { styles, ids, SWATCHES, METRICS } = useContext(ThemeContext);

	const {
		// style props
		color = 'primary',
		size = 'medium',
		inverted,
		// rest
		dummy,
		href,
		width,
		onPress = () => {},
		label,
		shape,
		isLoading,
		style,
		children,
		...other
	} = props

	
	// WIDTH SHORTHAND SYSTEM
	// The 'width' prop is converted to responsive variant objects for convenience
	// This provides common responsive button patterns without verbose variant objects
	let variant;
	if(!props.variant){
		switch(width){
			case 'snap':
				// 'snap': full-width on mobile, shrink-to-content on desktop
				variant = {small: 'grow', medium: 'shrink'};
				break;
			case 'full':
				// 'full': full-width on all screen sizes
				variant = {small: 'grow'};
				break;
			default:
				// default: shrink-to-content on all screen sizes
				variant = {small: 'shrink'};
				break;
		}
	}
	else{
		// If explicit variant provided, use that instead of width shorthand
		variant = props.variant
	}

	// touchable component and semantics
	let ActionComponent, actionComponentProps;
	if(dummy){
		// rare situations where a button-looking element needs to be wrapped by component that is already clickable
		ActionComponent = View;
	}
	else if(href){
		// href link
		ActionComponent = Link;
		actionComponentProps = {
			href: href,
			accessibilityRole: 'link'
		}
	}
	else{
		// onPress action
		ActionComponent = Touch;
		actionComponentProps = {
			onPress: onPress,
			accessibilityRole: 'button'
		}
	}


	// styles 
	const {
		buttonStyleKeys, 
		textStyleKeys
	} = getStyleKeys({...props, variant, styles});
	const {
		activeStyles: buttonActiveStyles, 
		activeIds: buttonActiveIds
	} = getActiveStyles(buttonStyleKeys, styles, ids);
	const {
		activeStyles: textActiveStyles, 
		activeIds: textActiveIds
	} = getActiveStyles(textStyleKeys, styles, ids);
	const inkColor = SWATCHES[`button${capitalize(color)}${ inverted ? 'Inverted' : ''}Ink`];

	return(
		<ActionComponent
			style={[ buttonActiveStyles, style]}
			dataSet={{ media: buttonActiveIds}}
			{...actionComponentProps}
			{...other}
			>
			<View style={isLoading ? styles.visibilityHidden : styles.visibilityVisibile}>
					<View style={styles.buttonContent}>
						{ shape &&
							<Icon 
								shape={shape} 
								color={inkColor} 
								//style={{marginLeft: 3, marginRight: 3}} 
								size={size}
								/>
						}
						{ label && 
							<Text 
								style={textActiveStyles}
								dataSet={{ media: textActiveIds}}
								>{label}</Text>
						}
					</View>
				{children}
			</View>
			
			{ isLoading &&
				<View style={styles.absoluteCenter}>
					<ActivityIndicator
						color={inkColor}
						/>
				</View>
			}

		</ActionComponent>
	);
}

export default Button;