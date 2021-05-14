import React, {useContext} from 'react';
import { View, Image, Platform } from '../primitives';
import PropTypes from 'prop-types';
import ThemeContext from '../ThemeContext';

import * as Icons from 'react-feather';

const Icon = (props) => {
	const { styles, SWATCHES } = useContext(ThemeContext);
		const {
			color = SWATCHES.textSecondary,
			size = 'medium',
			shape,
			style,
			...other
		} = props;

		const SIZES = {
			xsmall: 14,
			small: 16,
			medium: 24,
			large: 36,
			xlarge: 64
		}
		const pixelSize = SIZES[size];

		const ThisIcon = Icons[shape];




		return <ThisIcon color={color} size={pixelSize} style={style} {...other} />;

		//return <View />;

}


Icon.propTypes = {
	size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
	shape: PropTypes.string,
	color: PropTypes.string
}

export default Icon;