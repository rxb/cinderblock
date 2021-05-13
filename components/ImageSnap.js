import React, {useContext} from 'react';
import { View, Image } from '../primitives';
import styles from '../styles/buildStyles';
import {useMediaContext} from './UseMediaContext';
import { METRICS, BREAKPOINTS } from '../styles/designConstants';
import { findWidestActiveValue } from '../utils';


const ImageSnap = (props) => {

	const {
		children,
		image,
		imageHeight = {small: 250, medium: 300, large: 350, xlarge: 450},
		style,
		isFirstChild
	} = props

	const media = useMediaContext();

	const imageHeightStyle = {height: findWidestActiveValue(imageHeight, media)};
	const styleKeys = [
		'stripe',
		...[ (media && media.medium) ? 'imageSnap--atMedium' : undefined]
	];
	const combinedStyles = styleKeys.map((key, i)=>{
		return styles[key];
	});


	return(
		<Image
			source={{uri: image}}
			style={[ style, styles.imageSnap, imageHeightStyle, combinedStyles ]}
			>
			{children}
		</Image>
	);


}

export default ImageSnap;