import React, {useContext} from 'react';
import { Platform, StyleSheet } from '../primitives';
import Text from './Text';
import ThemeContext from '../ThemeContext';
import {TEXT_COLORS} from '../styles/designConstants';

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
 * @param {string} [props.htmlFor] - ID of the input this label describes on web
 * @param {Object} [props.style] - Additional styles to apply
 * @param {React.ReactNode} props.children - Label text content
 * 
 * @example
 * // Basic form field with label
 * <Chunk>
 *   <Label htmlFor="email">Email Address</Label>
 *   <TextInput 
 *     id="email"
 *     value={email}
 *     onChange={(event) => setEmail(event.target.value)}
 *     placeholder="your@email.com"
 *   />
 * </Chunk>
 * 
 * @example
 * // Required field with styled label
 * <Chunk>
 *   <Label htmlFor="full-name">
 *     Full Name <Text color="error">*</Text>
 *   </Label>
 *   <TextInput 
 *     id="full-name"
 *     value={name}
 *     onChange={(event) => setName(event.target.value)}
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
 *     <Label htmlFor="name">Name</Label>
 *     <TextInput id="name" value={name} onChange={event => setName(event.target.value)} />
 *   </Chunk>
 *   
 *   <Chunk>
 *     <Label htmlFor="email">Email</Label>
 *     <TextInput id="email" value={email} onChange={event => setEmail(event.target.value)} />
 *   </Chunk>
 *   
 *   <Chunk>
 *     <Label htmlFor="message">Message</Label>
 *     <TextInput id="message" multiline value={message} onChange={event => setMessage(event.target.value)} />
 *   </Chunk>
 * </Section>
 * 
 * @example
 * // Label with help text
 * <Chunk>
 *   <Label htmlFor="password">
 *     Password
 *     <Text color="secondary" size="small"> (minimum 8 characters)</Text>
 *   </Label>
 *   <TextInput 
 *     id="password"
 *     secureTextEntry
 *     value={password}
 *     onChange={event => setPassword(event.target.value)}
 *   />
 * </Chunk>
 */
const Label = (props) => {
	const { styles } = useContext(ThemeContext);
	const {
		children,                  // Label text content
		color = 'secondary',       // Text color (secondary for subtle labeling)
		htmlFor,
		for: legacyFor,
		style,                     // Additional styles
		...other
	} = props;

	if(Platform.OS === 'web'){
		const colorKey = TEXT_COLORS[color] || TEXT_COLORS.secondary;
		return React.createElement(
			'label',
			{
				htmlFor: htmlFor || legacyFor,
				style: StyleSheet.flatten([
					styles.text,
					styles.textBody,
					styles[`text${colorKey}`],
					styles.textLabel,
					{display: 'block'},
					style
				]),
				...other
			},
			children
		);
	}

	return(
		<Text
			accessibilityRole="label"
			color={color}
			style={[styles['textLabel'], style]}
			{...other}
			>
			{children}
		</Text>
	);
}


export default Label;
