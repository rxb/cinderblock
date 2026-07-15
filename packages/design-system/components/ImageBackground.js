import React from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View } from '../primitives';

/**
 * Cross-platform background image container with explicit fit and focal-point
 * controls. Unlike React Native's basic ImageBackground, contentPosition is
 * implemented consistently on Android, iOS, tvOS, and web by expo-image.
 */
const ImageBackground = React.forwardRef((props, ref) => {
	const {
		children,
		contentFit = 'cover',
		contentPosition = 'center',
		imageProps,
		imageRef,
		imageStyle,
		source,
		style,
		...other
	} = props;

	return (
		<View ref={ref} style={[styles.container, style]} {...other}>
			<Image
				{...imageProps}
				ref={imageRef}
				source={source}
				contentFit={contentFit}
				contentPosition={contentPosition}
				pointerEvents="none"
				style={[StyleSheet.absoluteFill, imageStyle]}
			/>
			{children}
		</View>
	);
});

ImageBackground.displayName = 'ImageBackground';

const styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
		position: 'relative'
	}
});

export default ImageBackground;
