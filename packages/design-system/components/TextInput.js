import React, {Fragment, useContext} from 'react';
import ReactDOM from 'react-dom'
import { StyleSheet } from '../primitives';
import { View, TextInput as TextInputWeb } from 'react-native-web';
import Text from './Text';
import ThemeContext from '../ThemeContext';

/**
 * Debounces function calls to prevent excessive updates during rapid user input.
 * Used for character counter updates to avoid performance issues.
 * 
 * @param {Function} callback - Function to debounce
 * @param {number} [time=60] - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(callback, time = 60) {
	var timeout;
	return function() {
		var context = this;
		var args = arguments;
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(function() {
			timeout = null;
			callback.apply(context, args);
		}, time);
	}
}


/**
 * Advanced text input component with auto-expansion, character counting, and focus states.
 * Provides enhanced functionality beyond basic HTML inputs for forms and user interactions.
 * 
 * Features:
 * - Auto-expanding height for multiline inputs
 * - Character counter with color feedback (warns when approaching limit)
 * - Focus state management and styling
 * - Debounced updates for performance
 * - Consistent styling with design system
 * 
 * @example
 * // Basic single-line input
 * <TextInput 
 *   value={name}
 *   onChange={setName}
 *   placeholder="Enter your name"
 * />
 * 
 * @example
 * // Multiline input with character limit
 * <TextInput 
 *   multiline
 *   value={message}
 *   onChange={setMessage}
 *   placeholder="Write your message..."
 *   maxLength={500}
 *   showCounter
 * />
 * 
 * @example
 * // Controlled input with validation
 * <TextInput 
 *   value={email}
 *   onChange={setEmail}
 *   onBlur={validateEmail}
 *   placeholder="your@email.com"
 *   autoCapitalize="none"
 * />
 */
class TextInput extends React.Component{
	static defaultProps = {
		autoExpand: true,    // Auto-expand height for multiline inputs
		onChange: ()=>{},    // Value change callback
		onFocus: () => {},   // Focus event callback
		onBlur: () => {},    // Blur event callback
		updateVersion: 0,    // Force update trigger
		value: '',           // Input value
	}

	constructor(props){
		super(props);
		this.state = {
			focus: false,           // Track input focus state for styling
			height: 0,              // Current height for auto-expanding inputs
			count: 0,               // Character count for counter display
			countColor: 'secondary' // Counter color ('secondary', 'warning', 'error')
		}
		// Bind event handlers to component instance
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onContentSizeChange = this.onContentSizeChange.bind(this);
		this.updateCounter = this.updateCounter.bind(this);
	}

	componentDidMount(){
		this.updateCounter(this.props.value);
	}

	shouldComponentUpdate(nextProps, nextState){
		if(this.props.value != nextProps.value){
			return true;
		}
		if(this.state != nextState){
			return true;
		}

		// passing in a cursor from props to explicitly trigger an update
		if(this.props.updateVersion != nextProps.updateVersion){
			return true;
		}

		return false;
	}

	updateCounter(text){
		let newState = {};

		// counter
		if(this.props.showCounter && this.props.maxLength){
			newState.count = text.length;
			newState.countColor = 'secondary';
			const diff = this.props.maxLength - newState.count;
			if(diff < 10){
				newState.countColor = 'tint';
			}
			this.setState(newState);
		}
	}

	onContentSizeChange(event){
		// right now, only expands, not contracts
		// doesn't fire on ssr
		const height = event.nativeEvent.contentSize.height;
		if(this.props.multiline && this.props.autoExpand && this.state.height <= height){
			this.setState({height: height});
		}
	}

	onChange(event){
		const text = event.target.value;
		debounce(this.updateCounter, 100)(text);
		this.props.onChange(event);
	}

	// these are just set set state to trigger a re-render on focus/blur
	onFocus(event){
		this.setState({focus: true});
		this.props.onFocus(event);
	}
	onBlur(event){
		this.setState({focus: false});
		this.props.onBlur(event);
	}

	render() {
		const {
			autoExpand,
			multiline,
			placeholder,
			maxLength,
			onChange,
			showCounter,
			style,
			focusStyle,
			wrapperStyle,
			onFocus,
			onBlur,
			onKeyPress,
			onSubmitEditing,
			children,
			...other
		} = this.props;


		return (
			<ThemeContext.Consumer>
			{ ({styles, SWATCHES}) => (
			<View style={wrapperStyle}>
				<TextInputWeb
					ref={ this.props.innerRef }
					accessibilityLabel={placeholder}
					placeholder={placeholder}
					placeholderTextColor={SWATCHES.textHint}
					multiline={multiline}
					maxLength={maxLength}
					onChange={this.onChange}
					onContentSizeChange={this.onContentSizeChange}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					onKeyPress={onKeyPress}
					onSubmitEditing={onSubmitEditing}
					className='input'
					style={[
						styles.input,
						multiline && styles['input--multiline'],
						multiline && maxLength && showCounter && styles['input--multilineAndCounter'],
						styles.text,
						styles.textBody,
						{minHeight: this.state.height},
						style,
					]}
					{...other}
					/>
				{ maxLength && showCounter &&
					<Text
						color={this.state.countColor}
						type="small"
						style={{position: 'absolute', bottom: 8, right: 8}}
						{...other}
						>{this.state.count}/{this.props.maxLength}</Text>
				}
				{children}
			</View>
			)}
			</ThemeContext.Consumer>
		);
	}
}


export default React.forwardRef((props, ref) => <TextInput 
  innerRef={ref} {...props}
/>);