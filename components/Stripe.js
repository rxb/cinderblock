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
	const { styles } = useContext(ThemeContext);

	const {
		children,
		image,
		imageHeight = {small: 225, medium: 325, large: 400, xlarge: 450},
		style,
		forwardedRef,
		...other
	} = props

	const media = useMediaContext();
	const combinedStyles = useMemo( ()=>getCombinedStyles(media, styles), [media]);
	const imageHeightStyle = (image) ? {height: findWidestActiveValue(imageHeight, media)} : {};

	if(image){
		return(
			<ImageBackground
				ref={forwardedRef}
				source={{uri: image}}
				style={[combinedStyles, style, imageHeightStyle]}
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
				style={[combinedStyles, style]} 
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