import React, {useContext} from 'react';
import Text from './Text';
import styles from '../styles/buildStyles';


const Label = (props) => {
	const {
		children,
		color = 'secondary',
		style,
		...other
	} = props;

	return(
		<Text
			accessibilityRole="label"
			style={[styles['textLabel'], style]}
			{...other}
			>
			{children}
		</Text>
	);
}


export default Label;