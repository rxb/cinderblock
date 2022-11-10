import React, {useMemo, useContext} from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text } from '../primitives';
import ThemeContext from '../ThemeContext';
import {getActiveStyles, getStyleKeysForMediaQueryVariants} from '../utils';

import {TEXT_TYPES} from '../styles/designConstants';
import Icon from './Icon';
import Link from './Link';
import Touch from './Touch';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1); 

const getStyleKeys = (props) => {

	const {
		color = 'primary',
		size = 'medium',
		inverted,
		variant,
	} = props;

	const invertedModifier = (inverted) ? 'Inverted' : '';
	const textType = {
		small: "small",
		medium: "body",
		large: "big"
	}[size];

	// BUTTON 
	const buttonStyleKeys = [
		'button',
		`button--${size}`,
		...getStyleKeysForMediaQueryVariants("button--", variant),
		...[color ? `button--${color}${invertedModifier}` : undefined ]
	];

	// BUTTON TEXT
	const textStyleKeys = [
		'text',
		...[textType ? `text${TEXT_TYPES[textType]}` : undefined ],
		'buttonText',
		...getStyleKeysForMediaQueryVariants("buttonText--", variant),
		...[color ? `buttonText--${color}${invertedModifier}` : undefined ],
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

	
	// width is shorthand for variants
	// this is pretty janky
	// maybe reconsider and do like list
	let variant;
	if(!props.variant){
		switch(width){
			case 'snap':
				variant = {small: 'grow', medium: 'shrink'};
				break;
			case 'full':
				variant = {small: 'grow'};
				break;
			default:
				variant = {small: 'shrink'};
				break;
		}
	}
	else{
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