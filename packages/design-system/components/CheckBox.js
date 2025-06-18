import React, {useContext} from 'react';
import { StyleSheet, Touchable } from '../primitives';
import { CheckBox as CheckBoxWeb } from 'react-native-web';
import Label from './Label';
import Text from './Text';
import Inline from './Inline';
import ThemeContext from '../ThemeContext';

/**
 * Form checkbox input component with label and focus state management.
 * Provides accessible checkbox functionality with design system integration.
 * 
 * CheckBox wraps React Native Web's checkbox with additional styling, focus management,
 * and label handling. It includes performance optimizations to prevent unnecessary
 * re-renders during focus changes and provides accessible label interaction.
 * 
 * Note: Due to React Native Web limitations, this component uses a controlled input
 * pattern and includes workarounds for focus styling and label clicking.
 * 
 * @example
 * // Basic checkbox with controlled state
 * const [agreed, setAgreed] = useState(false);
 * 
 * <CheckBox 
 *   value={agreed}
 *   onChange={setAgreed}
 *   label="I agree to the terms and conditions"
 * />
 * 
 * @example
 * // Form with multiple checkboxes
 * function PreferencesForm() {
 *   const [preferences, setPreferences] = useState({
 *     newsletter: false,
 *     notifications: false,
 *     marketing: false
 *   });
 *   
 *   const updatePreference = (key, value) => {
 *     setPreferences(prev => ({ ...prev, [key]: value }));
 *   };
 *   
 *   return (
 *     <Section>
 *       <Chunk><Text type="sectionHead">Email Preferences</Text></Chunk>
 *       
 *       <Chunk>
 *         <CheckBox 
 *           value={preferences.newsletter}
 *           onChange={(value) => updatePreference('newsletter', value)}
 *           label="Weekly newsletter"
 *         />
 *       </Chunk>
 *       
 *       <Chunk>
 *         <CheckBox 
 *           value={preferences.notifications}
 *           onChange={(value) => updatePreference('notifications', value)}
 *           label="Push notifications"
 *         />
 *       </Chunk>
 *       
 *       <Chunk>
 *         <CheckBox 
 *           value={preferences.marketing}
 *           onChange={(value) => updatePreference('marketing', value)}
 *           label="Marketing emails"
 *         />
 *       </Chunk>
 *     </Section>
 *   );
 * }
 * 
 * @example
 * // Checkbox in forms with validation
 * <Chunk>
 *   <CheckBox 
 *     value={acceptedTerms}
 *     onChange={setAcceptedTerms}
 *     label="I have read and accept the privacy policy"
 *   />
 *   <FieldError error={!acceptedTerms ? 'You must accept the terms to continue' : null} />
 * </Chunk>
 */

class CheckBox extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			hasFocus: false,          // Track focus state for styling
			lastManualUpdate: null    // Timestamp for manual label clicks
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		// Performance optimization: prevent unnecessary re-renders
		// Only update when specific state/props change
		
		if(this.state.hasFocus != nextState.hasFocus){
			return true;  // Focus state changed - update for styling
		}
		if(this.props.value != nextProps.value){
			return true;  // Checkbox value changed - update display
		}
		if(this.state.lastManualUpdate != nextState.lastManualUpdate){
			// Manual label click occurred - force update
			// This is a workaround for React Native Web checkbox limitations
			return true;
		}
		return false;  // No relevant changes - skip re-render
	}

	render(){
		const {
			id,          // Checkbox ID (for forms)
			label,       // Display text for the checkbox
			onChange,    // Value change callback
			...other     // Additional props (value, disabled, etc.)
		} = this.props;

		return (
			<ThemeContext.Consumer>
				{ ({styles, SWATCHES}) => (
					<Inline style={[styles.pseudoLineHeight, {alignItems: 'center'}]}>
						{/* Native checkbox input */}
						<CheckBoxWeb
							ref={ ref => this.checkbox = ref}
							style={{
								width: 24,
								height: 24,
							}}
							onFocus={()=>{
								this.setState({hasFocus: true});  // Track focus for styling
							}}
							onBlur={()=>{
								this.setState({hasFocus: false}); // Remove focus styling
							}}
							onChange={onChange}
							color={SWATCHES.tint}  // Checkbox color from theme
							{...other}
							/>
						{/* Clickable label text */}
						<Touchable onPress={()=>{
							// Workaround: trigger update when label is clicked
							// React Native Web doesn't handle label clicks automatically
							this.setState({lastManualUpdate: new Date().getTime() }, this.props.onChange)
						}}>
							<Text accessibilityRole="label">{label}</Text>
						</Touchable>
					</Inline>
				)}
			</ThemeContext.Consumer>
		);
	}
}


export default CheckBox;