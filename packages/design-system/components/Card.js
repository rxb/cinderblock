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
 * - Product listings and previews
 * - Content summaries and excerpts  
 * - Form sections and input groups
 * - Sidebar widgets and info panels
 * - Modal and dialog content areas
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.shadow] - Add drop shadow for elevated appearance
 * @param {Object} [props.style] - Additional styles to apply
 * @param {React.ReactNode} props.children - Content to display within the card
 * 
 * @example
 * // Basic card for grouping content
 * <Card>
 *   <Chunk><Text type="sectionHead">Product Name</Text></Chunk>
 *   <Chunk><Text>Product description...</Text></Chunk>
 *   <Chunk><Button>Add to Cart</Button></Chunk>
 * </Card>
 * 
 * @example
 * // Elevated card with shadow for modals or overlays
 * <Card shadow>
 *   <Chunk><Text type="sectionHead">Settings</Text></Chunk>
 *   <Chunk><TextInput label="Username" /></Chunk>
 *   <Chunk><Button>Save Changes</Button></Chunk>
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