import React, {useContext} from 'react';
import { View } from '../primitives';
import styles from '../styles/buildStyles';
import swatches from '../styles/swatches';

const Sectionless = (props) => {

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