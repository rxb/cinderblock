import React, {useContext} from 'react';
import { View } from '../primitives';
import ThemeContext from '../ThemeContext';

const Bounds = (props) => {
	const { styles } = useContext(ThemeContext);
	const {
		style,
		large,
		medium,
		small,
		children
	} = props;
	const finalStyles = [
		styles.bounds,
		...[large ? styles["bounds--large"] : {}],  
		...[medium ? styles["bounds--medium"] : {}],
		...[small ? styles["bounds--small"] : {}],
		style
	];
	return(
		<View style={finalStyles}>
			{children}
		</View>
	);
}


export default Bounds;