import React, {useContext} from 'react';
import { View, Text, StyleSheet } from '../primitives';
import ThemeContext from '../ThemeContext';


const Chip = (props) => {
	const { styles } = useContext(ThemeContext);

	return(
		<View style={styles.chip}>
			<Text style={[styles.text, styles.textSmall, styles.chipText]}>{props.label}</Text>
		</View>
	);
}


export default Chip;