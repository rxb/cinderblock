import React, {useContext} from 'react';
import { View } from '../primitives';
import ThemeContext from '../ThemeContext';

/**
 * Fundamental spacing component that provides consistent vertical rhythm between content elements.
 * The smallest unit in the Cinderblock hierarchy: Stripe > Section > Chunk.
 * 
 * Chunk creates uniform spacing between content elements (text, buttons, inputs, etc.) 
 * within a Section. This ensures consistent vertical rhythm throughout the interface.
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.inline] - Use inline layout instead of block (horizontal spacing)
 * @param {boolean} [props.border] - Add border styling to the chunk
 * @param {Object} [props.style] - Additional styles to apply
 * @param {React.ReactNode} props.children - Content to display within the chunk
 * 
 * @example
 * // Basic content organization
 * <Section>
 *   <Chunk><Text type="sectionHead">User Profile</Text></Chunk>
 *   <Chunk><Text>Update your profile information below.</Text></Chunk>
 *   <Chunk><TextInput label="Full Name" value={name} onChange={setName} /></Chunk>
 *   <Chunk><Button>Save Changes</Button></Chunk>
 * </Section>
 * 
 * @example
 * // Inline layout for horizontal elements
 * <Chunk inline>
 *   <Button>Cancel</Button>
 *   <Button color="primary">Save</Button>
 * </Chunk>
 * 
 * @example
 * // Bordered chunk for visual separation
 * <Chunk border>
 *   <Text>Important notice or highlighted content</Text>
 * </Chunk>
 */
const Chunk = (props) => {
	const { styles } = useContext(ThemeContext);
	const {
		children,
		inline,      // Boolean - use inline layout (horizontal spacing)
		style,
		border,      // Boolean - add border styling
		...other
	} = props;

	// Optimized way to enable inline layout without explicit <Inline> component
	const inlineStyle = (inline) ? styles.inline : {};
	const borderStyle = (border) ? styles["chunk--border"] : {};
	const finalStyles = [styles.chunk, inlineStyle, borderStyle, style];
	
	return(
		<View style={finalStyles} {...other}>
			{children}
		</View>
	);
}


export default Chunk;