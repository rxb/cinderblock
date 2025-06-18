import React, {useContext} from 'react';
import { Animated, Touchable, View } from '../primitives';
import Text from './Text';
import Touch from './Touch';
import Icon from './Icon';
import Flex from './Flex';
import FlexItem from './FlexItem';
import ThemeContext from '../ThemeContext';

import {EASE } from '../styles/designConstants';

/**
 * Toast notification system with automatic dismissal and animations.
 * Displays temporary notification messages with slide-in/out animations.
 * 
 * The Toaster system manages a queue of toast notifications, each with
 * configurable timing, auto-hide behavior, and dismissal options. Toasts
 * slide in from the bottom with smooth animations and can be manually
 * dismissed or automatically hidden after a delay.
 * 
 * The system consists of:
 * - Toaster: Container component that renders all active toasts
 * - Toast: Individual notification with animation and timing logic
 * 
 * @example
 * // Basic toaster implementation
 * function NotificationSystem() {
 *   const [toasts, setToasts] = useState([]);
 * 
 *   const addToast = (message, options = {}) => {
 *     const id = Date.now();
 *     const toast = {
 *       id,
 *       message,
 *       visible: true,
 *       autoHide: options.autoHide !== false,
 *       hideDelay: options.hideDelay || 2500,
 *       ...options
 *     };
 *     setToasts(prev => [...prev, toast]);
 *   };
 * 
 *   const hideToast = (id) => {
 *     setToasts(prev => prev.map(t => t.id === id ? { ...t, visible: false } : t));
 *   };
 * 
 *   const removeToast = (id) => {
 *     setToasts(prev => prev.filter(t => t.id !== id));
 *   };
 * 
 *   return (
 *     <View>
 *       {/* Your app content */}
 *       <Button onPress={() => addToast('Success! Changes saved.')}>Save</Button>
 *       <Button onPress={() => addToast('Error: Please try again.', { hideDelay: 5000 })}>
 *         Trigger Error
 *       </Button>
 *       
 *       {/* Toast container */}
 *       <Toaster
 *         toasts={toasts}
 *         hideToast={hideToast}
 *         removeToast={removeToast}
 *       />
 *     </View>
 *   );
 * }
 * 
 * @example
 * // Form validation with toast feedback
 * function FormWithToasts() {
 *   const { addToast } = useToaster(); // Assuming a toast context
 *   const formState = useFormState({
 *     initialFields: { email: '', password: '' }
 *   });
 * 
 *   const handleSubmit = async () => {
 *     try {
 *       await api.login(formState.fields);
 *       addToast('Successfully signed in! Welcome back.', {
 *         hideDelay: 3000
 *       });
 *     } catch (error) {
 *       if (error.code === 'invalid_credentials') {
 *         addToast('Invalid email or password. Please try again.', {
 *           hideDelay: 5000
 *         });
 *       } else {
 *         addToast('Something went wrong. Please try again later.', {
 *           autoHide: false // Requires manual dismissal
 *         });
 *       }
 *     }
 *   };
 * 
 *   return (
 *     <Section>
 *       <TextInput
 *         value={formState.getFieldValue('email')}
 *         onChange={(value) => formState.setFieldValue('email', value)}
 *         placeholder="Email"
 *       />
 *       
 *       <TextInput
 *         value={formState.getFieldValue('password')}
 *         onChange={(value) => formState.setFieldValue('password', value)}
 *         placeholder="Password"
 *         secureTextEntry
 *       />
 *       
 *       <Button onPress={handleSubmit}>Sign In</Button>
 *     </Section>
 *   );
 * }
 * 
 * @example
 * // Custom toast types with different timing
 * function ToastVariations() {
 *   const { addToast } = useToaster();
 * 
 *   const showSuccess = () => {
 *     addToast('Operation completed successfully!', {
 *       hideDelay: 2000 // Quick success message
 *     });
 *   };
 * 
 *   const showWarning = () => {
 *     addToast('Warning: This action cannot be undone.', {
 *       hideDelay: 4000 // Longer warning
 *     });
 *   };
 * 
 *   const showError = () => {
 *     addToast('Error: Please contact support if this persists.', {
 *       autoHide: false // Requires manual dismissal
 *     });
 *   };
 * 
 *   const showInfo = () => {
 *     addToast('Tip: You can customize these settings in your profile.', {
 *       hideDelay: 6000 // Longer info message
 *     });
 *   };
 * 
 *   return (
 *     <Section>
 *       <Button onPress={showSuccess}>Success Toast</Button>
 *       <Button onPress={showWarning}>Warning Toast</Button>
 *       <Button onPress={showError}>Error Toast</Button>
 *       <Button onPress={showInfo}>Info Toast</Button>
 *     </Section>
 *   );
 * }
 */


const duration = 200;

class Toast extends React.Component {

	static defaultProps = {
    	onCompleteClose: ()=>{ },
  	}

	constructor(props) {
		super(props);
		this.state = {
			visibility: new Animated.Value(0),
		}
		this.startHideTimeout = this.startHideTimeout.bind(this);
		this.remove = this.remove.bind(this);
	}

	componentDidMount(){
		if(this.props.visible){
			setTimeout(()=>{
				this.show();
			}, 1);
		}
	}

	componentDidUpdate(prevProps){
		if(this.props.visible != prevProps.visible){
			if(this.props.visible){
				this.show();
			}
			else{
				this.hide();
			}
		}
	}

	show(){
		Animated.timing(
			this.state.visibility,{
				toValue: 1,
				easing: EASE,
				duration
			}
		).start(this.startHideTimeout);
	}

	hide(){
		Animated.timing(
			this.state.visibility, {
				toValue: 0,
				easing: EASE,
				duration
			})
			.start(this.remove);
	}

	remove(){
		try{
			this.props.removeToast(this.props.toast.id)
		}
		catch(error){
			console.log('do you have multiple toasters mounted?');
			// toast is gone already
			// there are probably multiple toasters mounted
			// not the worst thing ever, but maybe look into that
		}
	}

	startHideTimeout(){
		const hideDelay = (this.props.toast.hideDelay !== undefined) ? this.props.toast.hideDelay : 2500;
		const autoHide = (this.props.toast.autoHide !== undefined) ? this.props.toast.autoHide : true;
		if(autoHide){
			const hideToast = this.props.hideToast;
			const id = this.props.toast.id;
			setTimeout(()=>{
				try{
					hideToast(id);
				}
				catch(error){
					console.log('do you have multiple toasters mounted?');
					// toast is gone already
					// there are probably multiple toasters mounted
					// not the worst thing ever, but maybe look into that
				}
			}, hideDelay);
		}
	}

	render(){
		return(
			<ThemeContext.Consumer>
			{ ({styles, SWATCHES}) => (
			<Animated.View
				style={{
					marginBottom: this.state.visibility.interpolate({
				    	inputRange: [0, 1],
				        outputRange: [-60, 0]
				    }),
					opacity: this.state.visibility
				}}
				>
				<View style={styles.toast}>
					<Flex direction="row">
						<FlexItem>
							<Text color="primary" inverted>{this.props.toast.message}</Text>
						</FlexItem>
						<FlexItem shrink justify="center">
							<Touch onPress={()=>{
								this.hide();
							}}>
								<Icon
									shape='X'
									color={SWATCHES.textHintInverted}
									size="small"
									/>
							</Touch>
						</FlexItem>
					</Flex>
				</View>
			</Animated.View>
			)}
			</ThemeContext.Consumer>
		);
	}
}


class Toaster extends React.Component {

	render() {
		const {
			toasts,
			...other
		} = this.props;

		return(
			<ThemeContext.Consumer>
			{ ({styles, SWATCHES}) => (
			<View style={styles.toaster}>
				<View style={styles['toaster-inner']}>
					{toasts.map((toast, i)=>{
						return <Toast
									key={toast.id}
									toast={toast}
									visible={toast.visible}
									{...other}
									/>
					})}
				</View>
			</View>
			)}
			</ThemeContext.Consumer>
		);
	}
}


export default Toaster;