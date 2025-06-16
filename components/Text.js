import React, {useContext} from 'react';
import { Text as ReactText } from '../primitives';
import ThemeContext from '../ThemeContext';
import {TEXT_TYPES, TEXT_COLORS, TEXT_WEIGHTS} from '../styles/designConstants';

const getAccessibilityProps = (type) => {
	switch(type){
		case 'pageHead':
			return {
				accessibilityRole: 'heading'
			};
		case 'sectionHead':
			return {
				accessibilityRole: 'heading',
				accessibilityLevel: 2
			};
		default:
			return {};
	}
}


const getActiveStyles = (props, styles, ids) => {

	const {
		inverted,
		type = "body",
		color = "primary",
		nowrap = false,
		chunk = false,
		weight,
	} = props;

	const invertedModifier = (inverted) ? '--inverted' : '';
	const styleKeys = [
		'text',
		...[type ? `text${TEXT_TYPES[type]}` : undefined ],
		...[color ? `text${TEXT_COLORS[color]}${invertedModifier}` : undefined ],
		...[weight ? `text${TEXT_WEIGHTS[weight]}` : undefined ],
		...[nowrap ? `textNowrap` : undefined],
		...[chunk ? `chunk` : undefined],
	];

	return {
		activeStyles: styleKeys.map((key, i)=>{
			return styles[key];
		}),
		activeIds: styleKeys.map((key, i)=>{
			return ids[key];
		}).join(' ')
	}
}

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