import React, {useContext} from 'react';
import Text from './Text';
import Inline from './Inline';
import Icon from './Icon';
import ThemeContext from '../ThemeContext';


const FieldError = (props) => {
	const { styles } = useContext(ThemeContext);
	const {
		style,
		error,
		...other
	} = props;

	if(!error){
		return false;
	}
	else{
		return(
			<Inline>
				<Icon
					shape="ArrowUpCircle"
					size="small"
					color="red"
					/>
				<Text
					type="small"
					style={[styles['textError'], style]}
					{...other}
					>
					{error}
				</Text>
			</Inline>
		);
	}
}


export default FieldError;