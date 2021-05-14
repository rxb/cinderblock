import React, {Fragment, useContext, useState} from 'react';
import { View, Image } from 'react-native-web';
import Icon from './Icon';
import Text from './Text';
import Touch from './Touch';
import ThemeContext from '../ThemeContext';



const FakeInput = (props) => {
	const { styles, SWATCHES } = useContext(ThemeContext);
	
	const {
		onPress = ()=>{},
		onFocus = ()=>{},
		onBlur = ()=>{},
		label,
		shape,
		style,
		...other
	} = props;

	const [hasFocus, setHasFocus] = useState();

		return (
			<Touch
				accessibilityRole="button"
				onPress={onPress}
				onFocus={()=>{
					setHasFocus(true);
					onFocus();
				}}
				onBlur={()=>{
					setHasFocus(false);
					onBlur();
				}}
				style={[
					styles.input,
					(hasFocus) ? styles['input--focus'] : {},
					style,
				]}
				>
				<Text color="hint">{label}</Text>
				{shape &&
					<View style={styles['input-icon']}>
						<Icon shape={shape} color={SWATCHES.textHint} />
					</View>
				}
			</Touch>
		);
	
}

export default FakeInput;