import React, {useContext} from 'react';
import Text from './Text';
import Inline from './Inline';
import Icon from './Icon';
import ThemeContext from '../ThemeContext';

/**
 * Form validation error display component with icon and styled text.
 * Provides consistent error messaging for form fields with visual indicators.
 * 
 * FieldError conditionally renders error messages only when present, making it
 * safe to include in form layouts without conditional logic. It combines an
 * error icon with styled text to clearly communicate validation failures.
 * 
 * @param {Object} props - Component props
 * @param {string|null|undefined} props.error - Error message to display (falsy values render nothing)
 * @param {Object} [props.style] - Additional styles to apply to the error text
 * 
 * @example
 * // Basic form field with error handling
 * <Chunk>
 *   <Label>Email Address</Label>
 *   <TextInput 
 *     value={email}
 *     onChange={setEmail}
 *     placeholder="your@email.com"
 *   />
 *   <FieldError error={emailError} />
 * </Chunk>
 * 
 * @example
 * // Form validation with multiple fields
 * function ContactForm() {
 *   const [fields, setField, fieldErrors, submitting, handleSubmit] = useFormState({
 *     initialFields: { name: '', email: '', message: '' }
 *   });
 *   
 *   return (
 *     <form onSubmit={handleSubmit(submitForm)}>
 *       <Chunk>
 *         <Label>Name</Label>
 *         <TextInput value={fields.name} onChange={(name) => setField('name', name)} />
 *         <FieldError error={fieldErrors.name} />
 *       </Chunk>
 *       
 *       <Chunk>
 *         <Label>Email</Label>
 *         <TextInput value={fields.email} onChange={(email) => setField('email', email)} />
 *         <FieldError error={fieldErrors.email} />
 *       </Chunk>
 *       
 *       <Chunk>
 *         <Label>Message</Label>
 *         <TextInput multiline value={fields.message} onChange={(message) => setField('message', message)} />
 *         <FieldError error={fieldErrors.message} />
 *       </Chunk>
 *     </form>
 *   );
 * }
 * 
 * @example
 * // Custom error styling
 * <Chunk>
 *   <Label>Password</Label>
 *   <TextInput 
 *     secureTextEntry
 *     value={password}
 *     onChange={setPassword}
 *   />
 *   <FieldError 
 *     error={passwordError} 
 *     style={{fontWeight: 'bold'}}
 *   />
 * </Chunk>
 * 
 * @example
 * // Conditional error display (handled automatically)
 * const emailError = !isValidEmail(email) ? 'Please enter a valid email address' : null;
 * 
 * <Chunk>
 *   <Label>Email</Label>
 *   <TextInput value={email} onChange={setEmail} />
 *   <FieldError error={emailError} />  {/* Only renders when emailError is truthy */}
 * </Chunk>
 */
const FieldError = (props) => {
	const { styles } = useContext(ThemeContext);
	const {
		style,       // Additional styles for error text
		error,       // Error message (string) or falsy value
		...other
	} = props;

	// Only render when error is present (truthy)
	if(!error){
		return null;
	}
	
	return(
		<Inline>
			<Icon
				shape="AlertCircle"    // Error/warning icon (changed from ArrowUpCircle)
				size="small"
				color="red"
				/>
			<Text
				type="small"
				style={[styles['textError'], style]}  // Error-specific text styling
				{...other}
				>
				{error}
			</Text>
		</Inline>
	);
}


export default FieldError;