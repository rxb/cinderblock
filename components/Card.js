import React from 'react';
import { View } from '../primitives';
import styles from '../styles/styles';

const Card = (props) => {
	const {
		children,
		style,
		...other
	} = props;

	return(
		<View style={[styles.card, styles.pseudoLineHeight, style]} {...other}>
			{children}
		</View>
	);
}


export default Card;