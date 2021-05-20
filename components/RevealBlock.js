import React, {Fragment, useState, useEffect, useCallback, useRef, useContext } from 'react';
import { Animated, Text, View } from '../primitives';
import {EASE} from '../styles/designConstants';
import ThemeContext from '../ThemeContext';

const RevealBlock = (props) => {
	const { styles } = useContext(ThemeContext);

	const { 
		delay = 0, 
		duration = 180,
		offset = 100,
		fromTop = false,
		visible = false,
		animateEntrance = true,
		animateExit = true,
		style
	} = props;
	const directionMultiplier = (fromTop) ? -1 : 1;

	const [visibilityValue, setVisibilityValue] = useState(new Animated.Value(0));
	const [added, setAdded] = useState(props.added);

	const add = () => {
		setAdded(true);
	}

	const show = () => {
		Animated.timing(
			visibilityValue,{
				toValue: 1,
				easing: EASE,
				duration: animateEntrance ? duration : 0,
				delay
			}
		).start();
	}

	const hide = () => {
		Animated.timing(
			visibilityValue,{
				toValue: 0,
				easing: EASE,
				duration: animateExit ? duration : 0,
				delay
			}
		).start( remove );
	}

	const remove = () => {

		setAdded(false);
	}

	useEffect(()=>{
		if(visible){
			add();
		}
		else{
			hide();
		}
	}, [visible]);

	useEffect(()=>{
		if(added){
			show();
		}
	}, [added]);

	return(
		<View style={{ display: (added) ? 'flex' : 'none' }}>
			{/* can't mix animated style properties and directly controlled style properties*/}
			<Animated.View
				style={[{           
					opacity: visibilityValue,
					transform: [{
						translateY: visibilityValue.interpolate({
						inputRange: [0, 1],
						outputRange: [(offset * directionMultiplier), 0]
						}),
					}]
				}]}>
					{props.children}
			</Animated.View>
		</View>
	);
	

}

export default RevealBlock;