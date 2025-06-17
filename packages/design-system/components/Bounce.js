import React, {useRef, useEffect} from 'react';
import { Animated } from '../primitives';

const Bounce = (props) => {

		const {
			watchProp,
			children,
			scale = 1.3
		} = props;

		const anim = useRef(new Animated.Value(1)).current;
		const bounce = () => {
			Animated.sequence([
				Animated.timing(anim, {
					toValue: scale,
					duration: 75
				 }),
				 Animated.timing(anim, {
					toValue: 1,
					duration: 75
				 }),
			]).start();
		 };
		 
		 useEffect(()=>{
			console.log('bounce');
			bounce();
		 }, [watchProp]);

		 useEffect(()=>{
			console.log('watching: '+watchProp);
		 }, []);

		return(
			<Animated.View
				style={{
					transform: [
						{ scale: anim }
					]
				}}
				>
				{children}
			</Animated.View>
		);
}

export default Bounce;