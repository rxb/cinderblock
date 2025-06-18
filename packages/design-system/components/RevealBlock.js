import React, {Fragment, useState, useEffect, useCallback, useRef, useContext } from 'react';
import { Animated, Text, View } from '../primitives';
import {EASE} from '../styles/designConstants';
import ThemeContext from '../ThemeContext';

/**
 * Animated container that reveals content with smooth entrance and exit transitions.
 * Provides customizable slide and fade animations for showing/hiding content blocks.
 * 
 * RevealBlock handles complex entrance and exit animations with opacity and transform
 * effects. It supports configurable timing, direction, and scroll behavior. Perfect
 * for modals, drawers, notifications, and progressive disclosure patterns.
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.visible=false] - Controls visibility state
 * @param {number} [props.delay=0] - Animation delay in milliseconds
 * @param {number} [props.duration=180] - Animation duration in milliseconds
 * @param {number} [props.offset=100] - Distance to slide in pixels
 * @param {boolean} [props.fromTop=false] - Slide from top instead of bottom
 * @param {boolean} [props.animateEntrance=true] - Enable entrance animation
 * @param {boolean} [props.animateExit=true] - Enable exit animation
 * @param {boolean} [props.scrollIntoView=false] - Auto-scroll when revealed
 * @param {Object} [props.style] - Additional styles to apply
 * @param {React.ReactNode} props.children - Content to reveal/hide
 * 
 * @example
 * // Basic reveal block for notifications
 * function NotificationPanel() {
 *   const [showNotification, setShowNotification] = useState(false);
 * 
 *   return (
 *     <Section>
 *       <Button onPress={() => setShowNotification(!showNotification)}>
 *         Toggle Notification
 *       </Button>
 *       
 *       <RevealBlock visible={showNotification}>
 *         <Card>
 *           <Chunk><Text color="green">Success! Your changes have been saved.</Text></Chunk>
 *         </Card>
 *       </RevealBlock>
 *     </Section>
 *   );
 * }
 * 
 * @example
 * // Reveal from top with custom timing
 * function DropdownMenu() {
 *   const [isOpen, setIsOpen] = useState(false);
 * 
 *   return (
 *     <View>
 *       <Touch onPress={() => setIsOpen(!isOpen)}>
 *         <Text>Menu {isOpen ? '↑' : '↓'}</Text>
 *       </Touch>
 *       
 *       <RevealBlock 
 *         visible={isOpen}
 *         fromTop={true}
 *         duration={250}
 *         offset={50}
 *       >
 *         <Card>
 *           <Chunk><Link href="/profile">Profile</Link></Chunk>
 *           <Chunk><Link href="/settings">Settings</Link></Chunk>
 *           <Chunk><Link href="/logout">Sign Out</Link></Chunk>
 *         </Card>
 *       </RevealBlock>
 *     </View>
 *   );
 * }
 * 
 * @example
 * // Progressive disclosure with scroll behavior
 * function DetailedForm() {
 *   const [showAdvanced, setShowAdvanced] = useState(false);
 * 
 *   return (
 *     <Section>
 *       <Chunk>
 *         <TextInput placeholder="Name" />
 *       </Chunk>
 *       <Chunk>
 *         <TextInput placeholder="Email" />
 *       </Chunk>
 *       
 *       <Chunk>
 *         <Button 
 *           onPress={() => setShowAdvanced(!showAdvanced)}
 *           type="secondary"
 *         >
 *           {showAdvanced ? 'Hide' : 'Show'} Advanced Options
 *         </Button>
 *       </Chunk>
 *       
 *       <RevealBlock 
 *         visible={showAdvanced}
 *         scrollIntoView={true}
 *         delay={100}
 *       >
 *         <Chunk><TextInput placeholder="Company" /></Chunk>
 *         <Chunk><TextInput placeholder="Job Title" /></Chunk>
 *         <Chunk><TextInput placeholder="Bio" multiline /></Chunk>
 *       </RevealBlock>
 *     </Section>
 *   );
 * }
 * 
 * @example
 * // Modal-style reveal without entrance animation
 * function QuickModal() {
 *   const [isVisible, setIsVisible] = useState(false);
 * 
 *   return (
 *     <>
 *       <Button onPress={() => setIsVisible(true)}>
 *         Show Modal
 *       </Button>
 *       
 *       <RevealBlock 
 *         visible={isVisible}
 *         animateEntrance={false}  // Appear instantly
 *         animateExit={true}       // But animate out
 *         duration={300}
 *       >
 *         <Card style={styles.modal}>
 *           <Chunk><Text type="title">Quick Modal</Text></Chunk>
 *           <Chunk><Text>This appeared instantly but will animate out.</Text></Chunk>
 *           <Chunk>
 *             <Button onPress={() => setIsVisible(false)}>
 *               Close
 *             </Button>
 *           </Chunk>
 *         </Card>
 *       </RevealBlock>
 *     </>
 *   );
 * }
 */
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
		scrollIntoView = false,
		style
	} = props;
	const directionMultiplier = (fromTop) ? -1 : 1;

	const [visibilityValue, setVisibilityValue] = useState(new Animated.Value(0));
	const [added, setAdded] = useState(props.added);
	const [hiding, setHiding] = useState(false);

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
		setHiding(true);
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
		setHiding(false);
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
			if(scrollIntoView){
				thisRef.current.scrollIntoView({behavior: "smooth"});
			}
			show();
		}
	}, [added]);

	const thisRef = useRef(null);

	return(
		<View 
			style={{
				display: (added) ? 'flex' : 'none', 
				position: 'static',
				overflow: 'visible',
				height: (hiding) ? 0 : 'auto'
			}} 
			ref={thisRef}>
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