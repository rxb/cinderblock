import React from 'react';
import { ActivityIndicator, Animated, Easing, Touchable, View, ScrollView, StyleSheet, PanResponder } from 'react-native';
import {
	Card,
	Chunk,
	Flex,
	FlexItem,
	Inline,
	Image,
	Touch,
	Icon,
	Header,
	Section,
	Stripe,
	Text
} from 'cinderblock';
import Hr from './Hr';

import { WithMatchMedia } from 'cinderblock/components/WithMatchMedia';
import { METRICS, EASE, MEDIA_SIZES } from 'cinderblock/designConstants';
import styles from 'cinderblock//styles/styles';
import swatches from 'cinderblock//styles/swatches';

import SwipeRecognizer from 'react-native-swipe-recognizer';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';



class Lightbox extends React.Component{

	// prevent body scrolling
	targetRef = React.createRef();
	targetElement = null;

	// panresponder setup
	translateX = new Animated.Value(0);
	_panResponder = PanResponder.create({
		onMoveShouldSetResponderCapture: () => true,
		onMoveShouldSetPanResponderCapture: () => true,
		onPanResponderMove: Animated.event([null, {dx: this.translateX}]),
		onPanResponderRelease: (e, {vx, dx}) => {
		  const screenWidth = window.innerWidth;
		  if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) {
		    Animated.timing(this.translateX, {
		      toValue: dx > 0 ? screenWidth : -screenWidth,
		      duration: 200
		    }).start(()=>{
		    	if(dx>0){
			    	this.cursorNext()
		    	}
		    	else{
			    	this.cursorPrevious()
		    	}
		    });
		  } else {
		    Animated.spring(this.translateX, {
		      toValue: 0,
		      bounciness: 10
		    }).start();
		  }
		}
	});

	static defaultProps = {
    	onPressEnter: ()=>{},
    	onRequestClose: ()=>{ console.log('onRequestClose not implemented') },
    	onCompleteClose: ()=>{},
    	items: [],
    	visible: false
  	}

	constructor(props) {
		super(props);
		this.state = {
			display: 'none',
			visibilityValue: new Animated.Value(0),
			cursor: 0,
			imageLoading: false
		}
		this.onKeyPress = this.onKeyPress.bind(this);
		this.cursorNext = this.cursorNext.bind(this);
		this.cursorPrevious = this.cursorPrevious.bind(this);
	}




	componentDidMount(){
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
			switch(event.keyCode){
				case 27: // esc
					event.preventDefault();
					this.props.onRequestClose();
					break;
				case 37: // left
					event.preventDefault();
					this.cursorPrevious();
					break;
				case 39:
					event.preventDefault();
					this.cursorPrevious();
					break;
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
		this.setState({cursor: 0});

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

	cursorPrevious(){
		const cursor = (this.state.cursor - 1 >= 0) ? this.state.cursor - 1 : this.props.items.length - 1;
		this.setState({cursor: cursor}, ()=>{this.translateX.setValue(0)});
	}

	cursorNext(){
		const cursor = (this.state.cursor + 1 < this.props.items.length) ? this.state.cursor + 1 : 0;
		this.setState({cursor: cursor}, ()=>{this.translateX.setValue(0)});
	}


	render() {

		const {
			children,
			onRequestClose,
			media,
			items,
			visible,
			...other
		} = this.props;

		const isFull = !media['medium'];
		const modalStyle = (isFull) ? styles['modal--full'] : styles['modal'];

		const item = items[this.state.cursor];

		return(
			<Animated.View
				style={[
					styles['modal-container'],
					{
						display: this.state.display,
						opacity: this.state.visibilityValue
					}
				]}
				ref={c => this.targetElement = c && c.getNode()}
			>


				<View style={[ styles['modal-backdrop'] ]} />

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

					<Flex direction="column" switchDirection="large" noGutters>
						<FlexItem>
							<Stripe style={{backgroundColor: 'black', minHeight: 400}}>
								<Section>
									<Chunk>
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
														onPress={this.cursorPrevious}
														style={LightboxStyles.expandTouch}
														>
														<Icon
															shape='ArrowLeft'
															color={swatches.textHintInverted}
															size="large"
															/>
													</Touch>

													<Touch
														onPress={this.cursorNext}
														style={LightboxStyles.expandTouch}
														>
														<Icon
															shape='ArrowRight'
															color={swatches.textHintInverted}
															size="large"
															/>
													</Touch>
												</Inline>
											</FlexItem>
										</Flex>
									</Chunk>
								</Section>

								<Section style={{flex: 1}}>
									<Chunk
										style={{flex: 1}}
										>
										<Animated.View
          									style={{flex: 1, transform: [{translateX: this.translateX}]}} {...this._panResponder.panHandlers}>
											<Image
												resizeMode="contain"
												style={{flex: 1}}
												source={{uri: item.image}}
												onLoadStart={()=>{
													this.setState({imageLoading: true})
												}}
												onLoadEnd={()=>{
													this.setState({imageLoading: false})
												}}
												/>
										</Animated.View>
										{ this.state.imageLoading &&
											<View style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, justifyContent: 'center', alignItems: 'center'}}>
												<ActivityIndicator
													color="white"
													size="large"
													/>
											</View>
										}
									</Chunk>
								</Section>
							</Stripe>
						</FlexItem>
						<FlexItem shrink>
							<Stripe style={{backgroundColor: '#111'}}>
								<Section style={{minWidth: 300}}>
									<Flex>
										<FlexItem>
											<Chunk>
												<Text inverted>{item.title}</Text>
												<Text inverted color="secondary">{item.description}</Text>
											</Chunk>
										</FlexItem>
										<FlexItem shrink>
											<Chunk>
												<Text inverted type="small" color="hint" style={{whiteSpace: 'nowrap'}}>{this.state.cursor + 1} of {this.props.items.length}</Text>
											</Chunk>
										</FlexItem>
									</Flex>
								</Section>
							</Stripe>
						</FlexItem>
					</Flex>
				</Animated.View>
			</Animated.View>
		);

	}
}

const LightboxStyles = StyleSheet.create({
	lightbox: {
		position: 'absolute',
		top: 0, right: 0, bottom: 0, left: 0,
		overflow: 'scroll',
		zIndex: 3
	},
	expandTouch: {
		padding: 8, margin: -8, position: 'relative'
	}
});


export default WithMatchMedia(Lightbox);