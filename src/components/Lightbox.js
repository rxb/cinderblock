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

/*

know that there is an input bug in ios versions < 11.3
fixed positioning gets weird

*/



/*

/////////////////////////
potential redux version

// state shape
modals: [
	{id: id, content: content, status: showing / hiding }
]

const id = id;
dispatch(showModal(id, content));
// mounts modal hidden then triggers animation to reveal

dispatch(hideModal(id));
// animates hiding, then triggers

dispatch(removeModal(id));


/////////////////////////
alternate way is to have a skeleton modal just hanging out and waiting to be popped

*/



class Modal extends React.Component{

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
	}
	componentWillUnmount(){
		document.removeEventListener("keydown", this.onKeyPress, false);
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
							<View style={[ styles['modal-backdrop'], {backgroundColor: 'rgba(0,0,0,.925)', backdropFilter: 'blur(6px)'} ]} />
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
					<Stripe style={{backgroundColor: 'yellow'}}>
						<Section style={{backgroundColor: 'green'}}>
							<Flex direction="row" style={{backgroundColor: 'purple'}}>
								<FlexItem shrink>
									<Touch
										onPress={onRequestClose}
										style={{position: 'relative', left: -5}}
										>
										<Icon
											shape='X'
											color="white"
											size="large"
											/>
									</Touch>
								</FlexItem>
								<FlexItem style={{backgroundColor: 'red'}}>
									<Inline>
									<Touch
										onPress={onRequestClose}
										>
										<Icon
											shape='ArrowLeft'
											color="white"
											size="large"
											/>
									</Touch>
									<Touch
										onPress={onRequestClose}
										>
										<Icon
											shape='ArrowRight'
											color="white"
											size="large"
											/>
									</Touch>
									</Inline>
								</FlexItem>
							</Flex>
						</Section>
						<View style={{flex: 1, padding: METRICS.space}}>
							<Flex direction="column" switchDirection="large">
								<FlexItem>
									{children}
								</FlexItem>
								<FlexItem shrink>
									<View style={{
										borderTopColor: swatches.borderInverted,
										borderTopWidth: 1,
										minWidth: 300,
										paddingTop: METRICS.space
									}}>
										<Text inverted>Some stuff</Text>
									</View>
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


export default WithMatchMedia(Modal);