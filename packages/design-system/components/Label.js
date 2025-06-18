import React, {useContext} from 'react';
import Text from './Text';
import ThemeContext from '../ThemeContext';

/**
 * Form label component that provides accessible labeling for form inputs.
 * Extends the Text component with specific styling and semantic roles for form accessibility.
 * 
 * Label provides consistent styling for form field labels and automatically applies
 * the correct accessibility role for screen readers. It should be used with all
 * form inputs to ensure proper form semantics and accessibility compliance.
 * 
 * @param {Object} props - Component props (extends Text component props)
 * @param {string} [props.color='secondary'] - Text color theme
 * @param {Object} [props.style] - Additional styles to apply
 * @param {React.ReactNode} props.children - Label text content
 * 
 * @example
 * // Basic form field with label
 * <Chunk>
 *   <Label>Email Address</Label>
 *   <TextInput 
 *     value={email}
 *     onChange={setEmail}
 *     placeholder="your@email.com"
 *   />
 * </Chunk>
 * 
 * @example
 * // Required field with styled label
 * <Chunk>
 *   <Label>
 *     Full Name <Text color="error">*</Text>
 *   </Label>
 *   <TextInput 
 *     value={name}
 *     onChange={setName}
 *     placeholder="Enter your full name"
 *   />
 * </Chunk>
 * 
 * @example
 * // Form with multiple labeled fields
 * <Section>
 *   <Chunk><Text type="sectionHead">Contact Information</Text></Chunk>
 *   
 *   <Chunk>
 *     <Label>Name</Label>
 *     <TextInput value={name} onChange={setName} />
 *   </Chunk>
 *   
 *   <Chunk>
 *     <Label>Email</Label>
 *     <TextInput value={email} onChange={setEmail} />
 *   </Chunk>
 *   
 *   <Chunk>
 *     <Label>Message</Label>
 *     <TextInput multiline value={message} onChange={setMessage} />
 *   </Chunk>
 * </Section>
 * 
 * @example
 * // Label with help text
 * <Chunk>
 *   <Label>
 *     Password
 *     <Text color="secondary" size="small"> (minimum 8 characters)</Text>
 *   </Label>
 *   <TextInput 
 *     secureTextEntry
 *     value={password}
 *     onChange={setPassword}
 *   />
 * </Chunk>
 */
const Label = (props) => {
	const { styles } = useContext(ThemeContext);
	const {
		children,                  // Label text content
		color = 'secondary',       // Text color (secondary for subtle labeling)
		style,                     // Additional styles
		...other
	} = props;

	return(
		<Text
			accessibilityRole="label"    // Semantic role for accessibility
			color={color}
			style={[styles['textLabel'], style]}  // Label-specific styling
			{...other}
			>
			{children}
		</Text>
	);
}


export default Label;