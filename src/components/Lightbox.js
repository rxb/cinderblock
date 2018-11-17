import React from 'react';
import { Animated, Easing, Touchable, View, ScrollView, StyleSheet } from 'react-native';

import {
	Card,
	Chunk,
	Flex,
	FlexItem,
	Inline,
	Touch,
	Icon,
	Header,
	Section,
	Stripe,
	Text
} from 'cinderblock';
import { WithMatchMedia } from 'cinderblock/components/WithMatchMedia';
import { METRICS, EASE } from 'cinderblock/designConstants';
import styles from 'cinderblock//styles/styles';
import swatches from 'cinderblock//styles/swatches';


import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';



class Lightbox extends React.Component{

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
		document.addEventListener("keydown", this.onKeyPress, false);
		if(this.props.visible){
			setTimeout(()=>{
				this.open();
			}, 1);
		}
		this.targetElement = this.targetRef.current;
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

	componentWillReceiveProps(nextProps){
		if(nextProps.visible){
			this.open();
		}
		else{
			this.close();
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
			media,
			visible,
			...other
		} = this.props;

		const isFull = !media['medium'];
		const modalStyle = (isFull) ? styles['modal--full'] : styles['modal'];

		return(
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
							<View style={[ styles['modal-backdrop'], {backgroundColor: 'rgba(0,0,0,.9)', backdropFilter: 'blur(6px)'} ]} />
					</Touch>
				}
				<Animated.View style={[
					LightboxStyles.lightbox,
					{
						transform: [{
					      translateY: this.state.visibilityValue.interpolate({
					        inputRange: [0, 1],
					        outputRange: [150, 0]
					      }),
					    }]
					}
				]}>
					<Stripe>
						<Section>
							<Flex direction="row">
								<FlexItem shrink>
									<Touch
										onPress={onRequestClose}
										style={{position: 'relative', left: -5}}
										>
										<Icon
											shape='X'
											color={swatches.textSecondaryInverted}
											size="large"
											/>
									</Touch>
								</FlexItem>
								<FlexItem style={{alignItems: 'flex-end'}}>
									<Inline>
									<Touch
										onPress={onRequestClose}
										>
										<Icon
											shape='ArrowLeft'
											color={swatches.textSecondaryInverted}
											size="large"
											/>
									</Touch>
									<Touch
										onPress={onRequestClose}
										>
										<Icon
											shape='ArrowRight'
											color={swatches.textSecondaryInverted}
											size="large"
											/>
									</Touch>
									</Inline>
								</FlexItem>
							</Flex>
						</Section>
						<View style={{flex: 1}}>
							<Flex direction="column" switchDirection="large">
								<FlexItem>
									<Section style={{flex: 1}}>
										{children}
									</Section>
								</FlexItem>
								<FlexItem shrink>
									<Section>
										<View style={{
											borderTopColor: swatches.borderInverted,
											borderTopWidth: 2,
											borderTopStyle: 'dotted',
											minWidth: 300,
											paddingTop: METRICS.space
										}}>
											<Text inverted>Look at this stuff</Text>
											<Text inverted color="secondary">Isn't it neat?</Text>
										</View>
									</Section>
								</FlexItem>
							</Flex>
						</View>
					</Stripe>
				</Animated.View>
			</Animated.View>
		);

	}
}

const LightboxStyles = StyleSheet.create({
	lightbox: {
		position: 'absolute',
		top: 0, right: 0, bottom: 0, left: 0,
		overflow: 'hidden',
		zIndex: 3
	}
});


export default WithMatchMedia(Lightbox);