import React, {useMemo, useContext} from 'react';
import { View } from '../primitives';
import ThemeContext from '../ThemeContext';

/**
 * Generates CSS class names for Section component styling.
 * Handles border variants and content styling modifiers.
 * 
 * @param {Object} props - Section component props
 * @returns {Array} Array of resolved CSS styles
 */
const getCombinedStyles = (props) => {
	const {
		border,          // Boolean - add border around entire section
		borderedContent, // Boolean - add top border to content (like bordered lists)
		styles           // Style object from ThemeContext
	} = props	
	
	const styleKeys = [
		'section',                                                    // Base section styles
		...[ (border) ? 'section--border' : undefined],             // Full border variant
		...[ (borderedContent) ? 'section--borderedContent' : undefined], // Content border variant
	];
	return styleKeys.map((key)=>{
		return styles[key];
	});
}

/**
 * Structural component for one page-outline content group.
 * Part of the ordinary Cinderblock hierarchy: Stripe > Bounds > Section > Chunk.
 * 
 * Section creates consistent vertical rhythm and horizontal inset, and can add
 * visual separation with borders. A page with only a pageHead/H1 still has one
 * Section. Each additional peer sectionHead/H2 normally begins another Section.
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.border] - Add border around the entire section
 * @param {boolean} [props.borderedContent] - Add top border to content (useful for lists)
 * @param {string} [props.type] - Section type (currently unused, reserved for future variants)
 * @param {Object} [props.style] - Additional styles to apply
 * @param {React.ReactNode} props.children - Content to display within the section
 * 
 * @example
 * // Page title section; no H2 is required
 * <Section>
 *   <Chunk><Text type="pageHead">Account</Text></Chunk>
 *   <Chunk><Text>Primary page content...</Text></Chunk>
 * </Section>
 *
 * @example
 * // Peer H2-level section
 * <Section>
 *   <Chunk><Text type="sectionHead">Preferences</Text></Chunk>
 *   <Chunk><Text>Content belonging to this heading...</Text></Chunk>
 * </Section>
 * 
 * @example
 * // Section with full border
 * <Section border>
 *   <Chunk><Text>Bordered content</Text></Chunk>
 * </Section>
 * 
 * @example
 * // Section with bordered content (for lists)
 * <Section borderedContent>
 *   <List items={items} renderItem={renderItem} />
 * </Section>
 */
const Section = (props) => {
	const { styles } = useContext(ThemeContext);

	const {
		children,
		type,        // Reserved for future section variants
		style,
		border,      // Add full border around section
		...other
	} = props

	const combinedStyles = useMemo( ()=>getCombinedStyles({...props, styles}), [border]);
	const finalStyles = [ combinedStyles, style ];

	return(
		<View style={finalStyles} {...other}>
			{children}
		</View>
	);
}


export default Section;
