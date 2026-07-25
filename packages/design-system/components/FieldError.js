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
 * @param {string} [props.id] - ID referenced by the input's `aria-describedby`
 * @param {boolean} [props.announce=true] - Announce newly rendered errors to assistive technology
 * @param {Object} [props.style] - Additional styles to apply to the error text
 * 
 * @example
 * // Basic form field with error handling
 * <Chunk>
 *   <Label htmlFor="email">Email Address</Label>
 *   <TextInput 
 *     id="email"
 *     value={email}
 *     onChange={(event) => setEmail(event.target.value)}
 *     placeholder="your@email.com"
 *     aria-invalid={Boolean(emailError)}
 *     aria-describedby={emailError ? 'email-error' : undefined}
 *   />
 *   <FieldError id="email-error" error={emailError} />
 * </Chunk>
 * 
 * @example
 * // Form validation with multiple fields
 * function ContactForm() {
 *   const formState = useFormState({
 *     initialFields: { name: '', email: '', message: '' }
 *   });
 *   
 *   return (
 *     <form onSubmit={submitForm}>
 *       <Chunk>
 *         <Label htmlFor="name">Name</Label>
 *         <TextInput id="name" value={formState.fields.name} onChange={(event) => formState.setFieldValue('name', event.target.value)} />
 *         <FieldError id="name-error" error={formState.error.fieldErrors?.name} />
 *       </Chunk>
 *       
 *       <Chunk>
 *         <Label htmlFor="email">Email</Label>
 *         <TextInput id="email" value={formState.fields.email} onChange={(event) => formState.setFieldValue('email', event.target.value)} />
 *         <FieldError id="email-error" error={formState.error.fieldErrors?.email} />
 *       </Chunk>
 *       
 *       <Chunk>
 *         <Label htmlFor="message">Message</Label>
 *         <TextInput id="message" multiline value={formState.fields.message} onChange={(event) => formState.setFieldValue('message', event.target.value)} />
 *         <FieldError id="message-error" error={formState.error.fieldErrors?.message} />
 *       </Chunk>
 *     </form>
 *   );
 * }
 * 
 * @example
 * // Custom error styling
 * <Chunk>
 *   <Label htmlFor="password">Password</Label>
 *   <TextInput 
 *     id="password"
 *     secureTextEntry
 *     value={password}
 *     onChange={event => setPassword(event.target.value)}
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
 *   <Label htmlFor="email">Email</Label>
 *   <TextInput id="email" value={email} onChange={event => setEmail(event.target.value)} />
 *   <FieldError id="email-error" error={emailError} />  // Only renders when emailError is truthy
 * </Chunk>
 */
const FieldError = (props) => {
	const { styles } = useContext(ThemeContext);
	const {
		style,       // Additional styles for error text
		error,       // Error message (string) or falsy value
		id,
		announce = true,
		...other
	} = props;

	// Only render when error is present (truthy)
	if(!error){
		return null;
	}
	
	return(
		<Inline>
			<Icon
				shape="AlertCircle"
				size="small"
				color="red"
				aria-hidden
				/>
			<Text
				id={id}
				role={announce ? 'alert' : undefined}
				aria-atomic={announce ? true : undefined}
				type="small"
				style={[styles['textError'], style]}
				{...other}
				>
				{error}
			</Text>
		</Inline>
	);
}


export default FieldError;
