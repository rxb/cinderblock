import React from 'react';
import { View } from './Primitives';
import styles from '../styles/styles';
import Link from './Link';

const Menu = (props) => {

	const {
		children,
		...other
	} = props;

	return(
		<Touchable
			{...other}
			>
			{children}
		</Touchable>
	);
}


export default Menu;