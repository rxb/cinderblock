import React, {useContext} from 'react';
import { View } from '../primitives';
import ThemeContext from '../ThemeContext';


const Sectionless = (props) => {
	const { styles } = useContext(ThemeContext);

	const {
		children,
		isFirstChild,
		noBorder,
		style,
	} = props

	return(
		<View style={[
			styles.sectionless,
			style
		]}>
			{children}
		</View>
	);
}


export default Sectionless;