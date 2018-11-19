import React from 'react';
import { View } from '../primitives';
import styles from '../styles/styles';

const Bounds = (props) => {
	const {
		style,
		children,
		...other
	} = props;
	return(
		<View style={[styles.bounds, style]} {...other}>
			{children}
		</View>
	);
}


export default Bounds;