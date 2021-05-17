import React, {useContext} from 'react';
import { Text as ReactText } from '../primitives';
import ThemeContext from '../ThemeContext';
import {TEXT_TYPES, TEXT_COLORS, TEXT_WEIGHTS} from '../styles/designConstants';


const getActiveStyles = (props, styles, ids) => {

	const {
		inverted,
		type = "body",
		color = "primary",
		nowrap = false,
		weight,
	} = props;

	const invertedModifier = (inverted) ? '--inverted' : '';
	const styleKeys = [
		'text',
		...[type ? `text${TEXT_TYPES[type]}` : undefined ],
		...[color ? `text${TEXT_COLORS[color]}${invertedModifier}` : undefined ],
		...[weight ? `text${TEXT_WEIGHTS[weight]}` : undefined ],
		...[nowrap ? `textNowrap` : undefined],
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
		...other 
	} = props;

	const { styles, ids } = useContext(ThemeContext);
	const {activeStyles, activeIds} = getActiveStyles(props, styles, ids);

	return(
		<ReactText
			style={[activeStyles, style]}
			dataSet={{ media: activeIds }}
			{...other}
			>
			{children}
		</ReactText>
	);
}


export default Text;