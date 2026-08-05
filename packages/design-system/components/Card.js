import React, {useMemo, useContext} from 'react';
import { View } from '../primitives';
import ThemeContext from '../ThemeContext';

/**
 * Generates CSS class names for Card component styling.
 * Handles shadow variants and baseline text alignment.
 * 
 * @param {Object} props - Card component props
 * @param {Object} styles - Style object from ThemeContext
 * @returns {Array} Array of resolved CSS styles
 */
const getCombinedStyles = (props, styles) => {
	const { shadow } = props	
	
	const styleKeys = [
		'card',                                      // Base card styles (background, border, padding)
		'pseudoLineHeight',                         // Text baseline alignment fix
		...[ (shadow) ? 'card--shadow' : undefined], // Drop shadow variant
	];
	return styleKeys.map((key)=>{
		return styles[key];
	});
}


/**
 * Container component that groups related content with consistent styling and optional elevation.
 * Provides a visual boundary for content sections and supports drop shadows for layered interfaces.
 * 
 * Cards are commonly used for:
 * - Selectable records and product previews
 * - Self-contained summaries and excerpts
 * - Distinct objects with their own actions
 * - Sidebar widgets and info panels
 *
 * Card does not provide content padding. The normal interior structure is
 * Card > Sectionless > Chunk. Do not use Card as the default page, form,
 * Modal, or Prompt content wrapper.
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.shadow] - Add drop shadow for elevated appearance
 * @param {Object} [props.style] - Additional styles to apply
 * @param {React.ReactNode} props.children - Content to display within the card
 * 
 * @example
 * // Basic card for grouping content
 * <Card>
 *   <Sectionless>
 *     <Chunk><Text type="sectionHead">Product Name</Text></Chunk>
 *     <Chunk><Text>Product description...</Text></Chunk>
 *     <Chunk><Button>Add to Cart</Button></Chunk>
 *   </Sectionless>
 * </Card>
 * 
 * @example
 * // Elevated card for a distinct selectable record
 * <Card shadow>
 *   <Sectionless>
 *     <Chunk><Text type="sectionHead">Saved routine</Text></Chunk>
 *     <Chunk><Text>Three lower-body exercises</Text></Chunk>
 *     <Chunk><Button>Use routine</Button></Chunk>
 *   </Sectionless>
 * </Card>
 */
const Card = (props) => {
	const { styles } = useContext(ThemeContext);
	const {
		children,
		style,
		shadow,      // Boolean - add drop shadow
		...other
	} = props;

	const combinedStyles = useMemo(() => getCombinedStyles(props, styles), [shadow])
	const finalStyles = [combinedStyles, style];

	return(
		<View style={finalStyles} {...other}>
			{children}
		</View>
	);
}


export default Card;
