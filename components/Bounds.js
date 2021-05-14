import React, {useContext} from 'react';
import { View } from '../primitives';
import ThemeContext from '../ThemeContext';

const Bounds = (props) => {
	const { styles } = useContext(ThemeContext);
	const {
		style,
		children
	} = props;
	const finalStyles = [styles.bounds, style];
	return(
		<View style={finalStyles}>
			{children}
		</View>
	);
}


export default Bounds;