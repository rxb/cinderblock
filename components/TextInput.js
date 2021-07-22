import React, {Fragment, useContext} from 'react';
import ReactDOM from 'react-dom'
import { StyleSheet } from '../primitives';
import { View, TextInput as TextInputWeb } from 'react-native-web';
import Text from './Text';
import ThemeContext from '../ThemeContext';


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


class TextInput extends React.Component{
	static defaultProps = {
		autoExpand: true,
		onChange: ()=>{},
		value: '',
	}

	constructor(props){
		super(props);
		this.state = {
			height: 0,
			count: 0,
			countColor: 'secondary'
		}
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

	render() {
		const {
			autoExpand,
			multiline,
			placeholder,
			maxLength,
			onChange,
			showCounter,
			style,
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
					onFocus={onFocus}
					onBlur={onBlur}
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
						style
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