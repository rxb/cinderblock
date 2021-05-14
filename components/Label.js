import React, {useContext} from 'react';
import Text from './Text';
import ThemeContext from '../ThemeContext';


const Label = (props) => {
	const { styles } = useContext(ThemeContext);
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