import React from 'react';
import { View } from './Primitives';
import styles from '../styles/styles';

const Card = (props) => {
	const {
		children,
		style,
		...other
	} = props;

	return(
		<View style={[styles.card, style]}>
			{children}
		</View>
	);
}


export default Card;