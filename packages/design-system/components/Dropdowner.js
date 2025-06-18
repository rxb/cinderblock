/**
 * Advanced dropdown system with centralized state management and positioning.
 * Provides reusable dropdown menus with automatic positioning and animations.
 * 
 * The Dropdowner system consists of three main components:
 * - Dropdowner: Container that renders all active dropdowns
 * - DropdownTouch: Trigger component that opens dropdowns
 * - DropdownItem: Individual menu items with link/action support
 * 
 * This system handles complex positioning logic, click-outside detection,
 * and coordinated state management across multiple dropdowns. It replaces
 * the legacy Menu component with better architecture.
 * 
 * Note: Uses DOM methods for positioning and click detection. For React Native,
 * consider using native menu components or adapting the positioning logic.
 * 
 * @example
 * // Complete dropdown implementation
 * function UserMenuExample() {
 *   // This would typically be managed by Redux or context
 *   const [dropdowns, setDropdowns] = useState([]);
 * 
 *   const addDropdown = (content, position) => {
 *     setDropdowns(prev => [...prev, { ...position, content, visible: true }]);
 *   };
 * 
 *   const hideDropdown = (id) => {
 *     setDropdowns(prev => prev.map(d => d.id === id ? { ...d, visible: false } : d));
 *   };
 * 
 *   const removeDropdown = (id) => {
 *     setDropdowns(prev => prev.filter(d => d.id !== id));
 *   };
 * 
 *   const clearDropdowns = () => {
 *     setDropdowns([]);
 *   };
 * 
 *   const userMenu = (
 *     <Section>
 *       <DropdownItem href="/profile">
 *         <Text>View Profile</Text>
 *       </DropdownItem>
 *       <DropdownItem href="/settings">
 *         <Text>Settings</Text>
 *       </DropdownItem>
 *       <DropdownItem onPress={handleLogout}>
 *         <Text>Sign Out</Text>
 *       </DropdownItem>
 *     </Section>
 *   );
 * 
 *   return (
 *     <View>
 *       {/* Dropdown trigger */}
 *       <DropdownTouch
 *         dropdown={userMenu}
 *         dropdowns={dropdowns}
 *         addDropdown={addDropdown}
 *         hideDropdown={hideDropdown}
 *         clearDropdowns={clearDropdowns}
 *       >
 *         <Flex direction="row" align="center">
 *           <Avatar size="small" />
 *           <Icon shape="ChevronDown" size="small" />
 *         </Flex>
 *       </DropdownTouch>
 * 
 *       {/* Dropdown container */}
 *       <Dropdowner
 *         dropdowns={dropdowns}
 *         hideDropdown={hideDropdown}
 *         removeDropdown={removeDropdown}
 *       />
 *     </View>
 *   );
 * }
 * 
 * @example
 * // Multiple dropdown triggers
 * function NavigationWithDropdowns() {
 *   const productsMenu = (
 *     <Section>
 *       <DropdownItem href="/products/software">
 *         <Text>Software</Text>
 *       </DropdownItem>
 *       <DropdownItem href="/products/hardware">
 *         <Text>Hardware</Text>
 *       </DropdownItem>
 *       <DropdownItem href="/products/services">
 *         <Text>Services</Text>
 *       </DropdownItem>
 *     </Section>
 *   );
 * 
 *   const helpMenu = (
 *     <Section>
 *       <DropdownItem href="/docs">
 *         <Text>Documentation</Text>
 *       </DropdownItem>
 *       <DropdownItem href="/support">
 *         <Text>Support</Text>
 *       </DropdownItem>
 *       <DropdownItem href="/contact">
 *         <Text>Contact Us</Text>
 *       </DropdownItem>
 *     </Section>
 *   );
 * 
 *   return (
 *     <Header>
 *       <Flex direction="row" align="center">
 *         <FlexItem><Text type="title">Logo</Text></FlexItem>
 *         
 *         <FlexItem grow justify="end">
 *           <Inline>
 *             <DropdownTouch dropdown={productsMenu}>
 *               <Text>Products ↓</Text>
 *             </DropdownTouch>
 *             
 *             <Link href="/about">About</Link>
 *             
 *             <DropdownTouch dropdown={helpMenu}>
 *               <Text>Help ↓</Text>
 *             </DropdownTouch>
 *           </Inline>
 *         </FlexItem>
 *       </Flex>
 *       
 *       <Dropdowner dropdowns={dropdowns} />
 *     </Header>
 *   );
 * }
 */

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
				shadowRadius: 10,
				shadowColor: 'rgba(0,0,0,.15)',
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