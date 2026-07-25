import React from 'react';
import { Platform, View, TextInput as TextInputWeb } from '../primitives';
import Text from './Text';
import ThemeContext from '../ThemeContext';


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
 *   onChange={(event) => setName(event.target.value)}
 *   placeholder="Enter your name"
 * />
 * 
 * @example
 * // Multiline input with character limit
 * <TextInput 
 *   multiline
 *   value={message}
 *   onChange={(event) => setMessage(event.target.value)}
 *   placeholder="Write your message..."
 *   maxLength={500}
 *   showCounter
 * />
 * 
 * @example
 * // Controlled input with validation
 * <TextInput 
 *   value={email}
 *   onChange={(event) => setEmail(event.target.value)}
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
		this.onKeyPress = this.onKeyPress.bind(this);
		this.onSubmitEditing = this.onSubmitEditing.bind(this);
		this.onContentSizeChange = this.onContentSizeChange.bind(this);
		this.updateCounter = this.updateCounter.bind(this);
	}

	componentDidMount(){
		this.updateCounter(this.props.value);
	}

	updateCounter(text){
		let newState = {};

		// counter
		if(this.props.showCounter && this.props.maxLength){
			newState.count = String(text ?? '').length;
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
		const text = event.target?.value ?? event.nativeEvent?.text ?? '';
		this.updateCounter(text);
		this.props.onChange(event);
	}

	onKeyPress(event){
		this.props.onKeyPress?.(event);
	}

	onSubmitEditing(event){
		// React Native Web stops key events at the input boundary. Restore the
		// browser's expected implicit form submission for single-line fields.
		const form = event.target?.form || event.target?.closest?.('form');
		if(
			Platform.OS === 'web' &&
			!this.props.multiline &&
			form
		){
			form.requestSubmit();
		}
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
					placeholder={placeholder}
					placeholderTextColor={SWATCHES.textHint}
					multiline={multiline}
					maxLength={maxLength}
					onChange={this.onChange}
					onContentSizeChange={this.onContentSizeChange}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					onKeyPress={this.onKeyPress}
					onSubmitEditing={
						onSubmitEditing ||
						(Platform.OS === 'web' && !multiline ? this.onSubmitEditing : undefined)
					}
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
