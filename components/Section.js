import React, {useMemo, useContext} from 'react';
import { View } from '../primitives';
import ThemeContext from '../ThemeContext';

const getCombinedStyles = (props) => {
	const {
		border,
		styles
	} = props	
	
	const styleKeys = [
		'section',
		...[ (border) ? 'section--border' : undefined],
	];
	return styleKeys.map((key, i)=>{
		return styles[key];
	});
}

const Section = (props) => {
	const { styles } = useContext(ThemeContext);

	const {
		children,
		type,
		style,
		border,
		...other
	} = props

	const combinedStyles = useMemo( ()=>getCombinedStyles({...props, styles}), [border]);
	const finalStyles = [ combinedStyles, style ];

	return(
		<View style={finalStyles}>
			{children}
		</View>
	);
}


export default Section;