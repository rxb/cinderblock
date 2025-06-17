import React, {useContext} from 'react';
import { View, Image } from '../primitives';
import ThemeContext from '../ThemeContext';
import {useMediaContext} from './UseMediaContext';
import { findWidestActiveValue } from '../utils';


const ImageRatio = (props) => {
	const { styles, ids } = useContext(ThemeContext);

	const {
		children,
		image,
		imageHeight = {small: 250, medium: 300, large: 350, xlarge: 450},
		style,
		isFirstChild
	} = props

	const media = useMediaContext();
	const imageHeightStyle = {height: findWidestActiveValue(imageHeight, media)};

	return(
		<Image
			source={{uri: image}}
			style={[ style, styles.imageRatio, imageHeightStyle ]}
			dataSet={{ media: ids['imageRatio']}}
			>
			{children}
		</Image>
	);


}

export default ImageRatio;