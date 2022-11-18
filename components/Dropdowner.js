// DROPDOWN
// this outclick stuff won't work on react native
// there's a lot that is counting on DOM stuff
// but maybe you should be using native components there for menus anyhow

import React, {useState, useRef, useCallback, useEffect, useContext} from 'react';
import { Animated } from '../primitives';
import { View } from '../primitives';
import Sectionless from './Sectionless';
import Chunk from './Chunk';
import Touch from './Touch';
import Link from './Link';
import Text from './Text';
import ThemeContext from '../ThemeContext';
import ReactDOM from 'react-dom';

import { EASE } from '../styles/designConstants';
import {v4 as uuid} from 'uuid';

export const Dropdowner = (props) => {
	const { styles } = useContext(ThemeContext);
	const {dropdowns, ...other} = props;
	return(
		<View style={styles.dropdowner}>
			{dropdowns.map((dropdown, i)=>{
				return <Dropdown
							key={dropdown.id}
							content={dropdown.content}
							x={dropdown.x}
							y={dropdown.y}
							id={dropdown.id}
							side={dropdown.side}
							visible={dropdown.visible}
							{...other}
							/>
			})}
		</View>
	)
}

export const DropdownTouch = (props) => {
	const { styles } = useContext(ThemeContext);
	const {
		children,
		dropdown,
		addDropdown,
		clearDropdowns,
		hideDropdown,
		dropdowns,
		style
	} = props;

	const touchRef = useRef(null);
	const [touchActive, setTouchActive] = useState(false);
	const [dropdownId, setDropdownId] = useState();

	useEffect(()=>{
		// active is set by whether the dropdown exists in redux
		setTouchActive( dropdowns.find( element => element.id == dropdownId ) );
	}, [dropdowns]);

	const measureAndAddDropdown = useCallback(() => {
		touchRef.current.measure((fx, fy, width, height, px, py) => {
			const side = (px + (width/2) <= window.innerWidth / 2) ? 'left' : 'right';
			const x = (side == 'left') ? px : (window.innerWidth - px - width);
			const y = py + height + window.pageYOffset;
			const id = uuid();
			setDropdownId(id);
			addDropdown(dropdown, {x, y, id, side});
		});
	})

	return(
		<View ref={touchRef} style={style}>
		<Touch
			onPress={(e)=>{
				e.preventDefault();
				clearDropdowns();
				if(!touchActive){
					// the outclick handles closing
					measureAndAddDropdown();
				}
			}}
			>
			{children}
		</Touch>
		</View>
	)
}


export const Dropdown = (props) => {
	const { styles, METRICS, SWATCHES } = useContext(ThemeContext);
	
	const { 
		hideDropdown,
		removeDropdown,
		x, y,
		side = 'left',
		content,
		id
	} = props;

   const [visibilityValue, setVisibilityValue] = useState(new Animated.Value(0));

	useEffect(()=>{
		const duration = 85;
		const delay = 0;
      if(props.visible){
         Animated.timing(
            visibilityValue,{
               toValue: 1,
               easing: EASE,
               duration,
               delay
            }
         ).start()
      }
      else{
         Animated.timing(
            visibilityValue,{
               toValue: 0,
               easing: EASE,
               duration,
               delay
            }
         ).start(()=>{
				onCompleteClose();
			})
      }
   }, [props.visible]);

	const onRequestClose = useCallback(()=> {
		if(props.onRequestClose){
			props.onRequestClose()
		}
		hideDropdown(id);
	});
	
	const onCompleteClose = useCallback(()=> {
		if(props.onCompleteClose){
			props.onCompleteClose()
		}
		removeDropdown(id);
	});

	// clicking outside dropdown closes dropdown
	const outerRef = useRef(null);
	const handleClick = useCallback((e) => {
		if(ReactDOM.findDOMNode(outerRef.current).contains(e.target)){
			return false;
		}
		onRequestClose();
	});
	useEffect(()=>{
		document.addEventListener('click', handleClick, false)
		return () => {
			document.removeEventListener('click', handleClick, false);
		};
	}, []);

	const dropdownContent = React.cloneElement(content, {
		onRequestClose: onRequestClose,
		onCompleteClose: onCompleteClose
	});

	const offset = METRICS.space;
	const directionMultiplier = -1;

	return (
		<Animated.View 
			style={{
				maxWidth: '50vw',
				position: 'absolute',
				[side]: x,
				top: y,
				zIndex: 100,
				backgroundColor: 'white',
				borderWidth: 1,
				borderColor: SWATCHES.border,
				borderRadius: METRICS.borderRadius,
				opacity: visibilityValue,
				overflow: 'hidden',
            transform: [{
               translateY: visibilityValue.interpolate({
               inputRange: [0, 1],
               outputRange: [(offset * directionMultiplier), 0]
               }),
            }]
			}} 
			ref={ outerRef }
			>
				{dropdownContent}
		</Animated.View>
	)
}

export const DropdownItem = (props) => {
	const { styles, METRICS, SWATCHES } = useContext(ThemeContext);
	const {
		dummy,
		href,
		onPress,
		children
	} = props;

	let ActionComponent, actionComponentProps;
	if(dummy){
		// rare situations where a button-looking element needs to be wrapped by component that is already clickable
		ActionComponent = View;
	}
	else if(href){
		// href link
		ActionComponent = Link;
		actionComponentProps = {
			href: href,
			accessibilityRole: 'link'
		}
	}
	else{
		// onPress action
		ActionComponent = Touch;
		actionComponentProps = {
			onPress: onPress,
			accessibilityRole: 'button'
		}
	}

	return (
		<ActionComponent {...actionComponentProps} style={styles.dropdownItem}>
			{children}
		</ActionComponent>
	);
}