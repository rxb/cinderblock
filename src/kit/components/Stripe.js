import React from 'react';
import { View, Image } from './Primitives';
import styles from '../styles/styles';

const Stripe = (props) => {

	const {
		children,
		image,
		imageSource,
		style,
	} = props

	if(image || imageSource){
		let source;
		if(image){
			source = {uri: image}
		}
		else if(imageSource){
			source = imageSource
		}
		return(
			<Image
				source={source}
				style={[styles.stripe, {resizeMode: 'cover'}, style]}
				>
				{children}
			</Image>
		);
	}
	else{
		return(
			<View style={[styles.stripe, style]}>
				{children}
			</View>
		);
	}

}


export default Stripe;