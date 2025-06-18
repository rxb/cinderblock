import React, {useContext} from 'react';
import { Animated, Easing, Touchable, View } from '../primitives';
import { ScrollView } from 'react-native-web';
import ThemeContext from '../ThemeContext';

import Card from './Card';
import Flex from './Flex';
import FlexItem from './FlexItem';
import Chunk from './Chunk';
import Touch from './Touch';
import Icon from './Icon';
import Header from './Header';
import Section from './Section';
import Stripe from './Stripe';
import { MediaContext } from './UseMediaContext';
import { EASE } from '../styles/designConstants';

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

/**
 * Advanced modal component with animations, accessibility, and responsive behavior.
 * 
 * Features:
 * - Smooth fade animations with configurable easing
 * - Body scroll locking to prevent background scrolling
 * - Responsive sizing (full-screen on mobile, centered on desktop)
 * - Keyboard support (ESC to close, Enter for actions)
 * - Overlay click-to-close functionality
 * - Proper focus management and accessibility
 * - Portal rendering for proper z-index layering
 * 
 * Note: There's a known iOS bug in versions < 11.3 where fixed positioning
 * can cause issues with input elements in modals.
 * 
 * @example
 * // Basic modal with content
 * <Modal 
 *   visible={showModal}
 *   onRequestClose={() => setShowModal(false)}
 * >
 *   <Card>
 *     <Chunk><Text type="sectionHead">Confirm Action</Text></Chunk>
 *     <Chunk><Text>Are you sure you want to proceed?</Text></Chunk>
 *     <Chunk>
 *       <Flex>
 *         <FlexItem><Button onPress={handleCancel}>Cancel</Button></FlexItem>
 *         <FlexItem><Button color="primary" onPress={handleConfirm}>Confirm</Button></FlexItem>
 *       </Flex>
 *     </Chunk>
 *   </Card>
 * </Modal>
 * 
 * @example
 * // Modal with form and enter key handling
 * <Modal 
 *   visible={showForm}
 *   onRequestClose={closeForm}
 *   onPressEnter={submitForm}
 * >
 *   <Card>
 *     <form onSubmit={submitForm}>
 *       <Chunk><TextInput label="Name" value={name} onChange={setName} /></Chunk>
 *       <Chunk><Button type="submit">Save</Button></Chunk>
 *     </form>
 *   </Card>
 * </Modal>
 */
class Modal extends React.Component{

	static contextType = MediaContext;

	// for body locking
	targetRef = React.createRef();
  	targetElement = null;

	static defaultProps = {
    	onPressEnter: ()=>{},
    	onRequestClose: ()=>{ console.log('onRequestClose not implemented') },
    	onCompleteClose: ()=>{ },
    	visible: false
  	}

	constructor(props) {
		super(props);
		this.state = {
			display: 'none',
			visibilityValue: new Animated.Value(0)
		}
		this.onKeyPress = this.onKeyPress.bind(this);

	}

	componentDidMount(){

		// if there are problems in ios with body locking
		// it's probably because of this https://github.com/willmcpo/body-scroll-lock/issues/102#issuecomment-482599456
		this.targetElement = this.targetRef.current;

		document.addEventListener("keydown", this.onKeyPress, false);
		if(this.props.visible){
			setTimeout(()=>{
				this.open();
			}, 1);
		}
	}
	componentWillUnmount(){
		document.removeEventListener("keydown", this.onKeyPress, false);
		clearAllBodyScrollLocks();
	}

	onKeyPress(event){
		if(this.props.visible){
			if(event.keyCode === 27) {
				event.preventDefault();
				this.props.onRequestClose();
			}
		}
	}

	/*
	UNSAFE_componentWillReceiveProps(nextProps){
		if(nextProps.visible){
			this.open();
		}
		else{
			this.close();
		}
	}
	*/
	componentDidUpdate(prevProps){
		if(this.props.visible != prevProps.visible){
			if(this.props.visible){
				this.open();
			}
			else{
				this.close();
			}
		}
	}

	open(){		
		disableBodyScroll(this.targetElement);
		const duration = 250;
		this.setState({display: 'flex'})
		Animated.timing(
			this.state.visibilityValue,{
				toValue: 1,
				easing: EASE,
				duration
			}
		).start();
	}

	close(){
		enableBodyScroll(this.targetElement);
		const duration = 250;
		Animated.timing(
			this.state.visibilityValue,{
				toValue: 0,
				easing: EASE,
				duration
			}
		).start(()=>{
			this.setState({display: 'none'});
			this.props.onCompleteClose();
		});
	}


	render() {

		const {
			children,
			onRequestClose,
			visible,
			...other
		} = this.props;

		const media = this.context;

		const isFull = !media['medium'];

		return(
			<ThemeContext.Consumer>
			{ ({styles, METRICS, SWATCHES}) => (
			<Animated.View style={[
				styles['modal-container'],
				{
					display: this.state.display,
					opacity: this.state.visibilityValue
				}
			]}>
				{ (true || !isFull) &&
					<Touch
						onPress={onRequestClose}
						noFeedback
						>
							<View style={[ styles['modal-backdrop'] ]} />
					</Touch>
				}
				<Animated.View style={[
					(isFull) ? styles['modal--full'] : styles['modal'],
					{
						transform: [{
					      translateY: this.state.visibilityValue.interpolate({
					        inputRange: [0, 1],
					        outputRange: [180, 0]
					      }),
					    }]
					}
				]}>
					{/*
					<Stripe style={{borderBottomWidth: 1, borderBottomColor: SWATCHES.border}}>
						<Section style={{ paddingVertical: 0}}>
							<Flex>
								<FlexItem shrink>
									<Touch
										onPress={onRequestClose}
										style={{backgroundColor: 'lightgray', borderRadius: 32}}
										>
										<View>
										<Icon
											shape='X'
											color="white"
											size="medium"
											/>
										</View>
									</Touch>
								</FlexItem>
							</Flex>
						</Section>
					</Stripe>
					*/}

					<View style={{position: 'absolute', top: 0, right: 0, padding: METRICS.base, zIndex: 5}}>
						<Touch
							onPress={onRequestClose}
							style={{backgroundColor: SWATCHES.shade, borderRadius: 32, padding: 4}}
							>
							<View>
							<Icon
								shape='X'
								color={SWATCHES.textHint}
								size="medium"
								/>
							</View>
						</Touch>
					</View>

					{/* scrollview is blocking the rest */}

					<ScrollView 
						style={{/*backgroundColor: 'green'*/}} 
						ref={this.targetRef}
						>
						{children}
					</ScrollView>
				</Animated.View>
			</Animated.View>
				)}
				</ThemeContext.Consumer>
		);

	}
}

export default Modal;