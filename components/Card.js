import React, {useMemo, useContext} from 'react';
import { View } from '../primitives';
import ThemeContext from '../ThemeContext';

const getCombinedStyles = (props) => {
	const { shadow } = props	
	
	const styleKeys = [
		'card',
		'pseudoLineHeight',
		...[ (shadow) ? 'card--shadow' : undefined],
	];
	return styleKeys.map((key, i)=>{
		return styles[key];
	});
}


const Card = (props) => {
	const { styles } = useContext(ThemeContext);
	const {
		children,
		style,
		shadow,
		...other
	} = props;

	const combinedStyles = useMemo(() => getCombinedStyles({...props, styles}), [shadow])
	const finalStyles = [combinedStyles, style];

	return(
		<View style={finalStyles}>
			{children}
		</View>
	);
}


export default Card;