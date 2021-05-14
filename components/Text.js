import React, {useContext} from 'react';
import { Text as ReactText } from '../primitives';
import ThemeContext from '../ThemeContext';
import {useMediaContext} from './UseMediaContext';
import {TEXT_TYPES, TEXT_COLORS, TEXT_WEIGHTS} from '../styles/designConstants';


const getCombinedStyles = (props, media, styles) => {

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
		...[media.large ? `text${TEXT_TYPES[type]}--atLarge` : undefined],
		...[nowrap ? `textNowrap` : undefined],
	];

	return styleKeys.map((key, i)=>{
		return styles[key];
	});
	
}


const Text = (props) => {
	const { styles } = useContext(ThemeContext);

	const { children, style, ...other } = props;
	const media = useMediaContext();
	const combinedStyles = getCombinedStyles(props, media, styles);

	return(
		<ReactText
			style={[combinedStyles, style]}
			{...other}
			>
			{children}
		</ReactText>
	);
}


export default Text;