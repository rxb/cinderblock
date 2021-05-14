import React, {useContext} from 'react';
import { View, Image, Text } from '../primitives';
import PropTypes from 'prop-types';
import ThemeContext from '../ThemeContext';


const Avatar = (props) => {
	const { styles } = useContext(ThemeContext);

	const {
		size,
		source,
		style
	} = props;

	const finalStyles = [
		styles['avatar'], 
		styles[`avatar--${size}`], 
		style
	];
	return(
		<Image
			source={source}
			style={finalStyles}
			/>
	);
}

Avatar.defaultProps = {
	size: 'medium',
};

Avatar.propTypes = {
	size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
	source: PropTypes.object
}

export default Avatar;