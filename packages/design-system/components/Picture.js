import React, {useContext} from 'react';
import { View, Image, Text } from '../primitives';
import PropTypes from 'prop-types';
import ThemeContext from '../ThemeContext';

const Picture = (props) => {
	const { styles, ids } = useContext(ThemeContext);
	
	const {
		size,
		source,
		style
	} = props;

	const finalStyles = [
		styles['picture'], 
		styles[`picture--${size}`],
		style
	];

	return(
		<Image
			source={source}
			style={finalStyles}
			dataSet={{ media: ids[`picture--${size}`] }}
			/>
	);
}

Picture.defaultProps = {
	size: 'medium',
};

Picture.propTypes = {
	size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', false]),
	source: PropTypes.object
}

export default Picture;