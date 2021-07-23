import React, {useMemo, useContext} from 'react';
import { View, Image, ImageBackground } from '../primitives';
import ThemeContext from '../ThemeContext';
import {useMediaContext} from './UseMediaContext';
import { BREAKPOINTS, METRICS } from '../styles/designConstants';
import {findWidestActiveValue} from '../utils';

const getCombinedStyles = (media, styles) => {	
	const styleKeys = [
		'stripe',
		...[ (media && media.medium) ? 'stripe--atMedium' : undefined],
	];
	return styleKeys.map((key, i)=>{
		return styles[key];
	});
}

const Stripe = (props) => {
	const { styles, ids } = useContext(ThemeContext);

	const {
		children,
		image,
		border,
		imageHeight = {small: 225, medium: 325, large: 400, xlarge: 450},
		style,
		forwardedRef,
		...other
	} = props

	// keeping matchmedia for image height since it's so variable
	const media = useMediaContext();
	const imageHeightStyle = (image) ? {height: findWidestActiveValue(imageHeight, media)} : undefined;
	const borderStyle = (border) ? styles['stripe--border'] : undefined;

	if(image){
		return(
			<ImageBackground
				ref={forwardedRef}
				source={{uri: image}}
				style={[styles['stripe'], borderStyle, style, imageHeightStyle]}
				dataSet={{ media: ids['stripe']}} 
				{...other}
				>
				{children}
			</ImageBackground>
		);
	}
	else{
		return(
			<View 
				ref={forwardedRef}
				style={[styles['stripe'], borderStyle, style]}
				dataSet={{ media: ids['stripe']}} 
				{...other}
				>
				{children}
			</View>
		);
	}
};

const WrappedComponent = React.forwardRef((props, ref) => {
	return <Stripe {...props} forwardedRef={ref} />;
});

export default WrappedComponent;