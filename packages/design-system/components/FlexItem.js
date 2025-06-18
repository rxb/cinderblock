import React, {useMemo, useContext} from 'react';

import PropTypes from 'prop-types';
import { View } from '../primitives';
import ThemeContext from '../ThemeContext';

// CSS class constants for flex item styling
export const FLEX_CLASS = 'flex';
export const FLEX_ALIGN_CLASS = `${FLEX_CLASS}--align-`;
export const FLEX_JUSTIFY_CLASS = `${FLEX_CLASS}--justify-`;
export const FLEX_ITEM_CLASS = 'flex-item';
export const FLEX_ITEM_SHRINK_CLASS = 'flex-item--shrink';
export const FLEX_ITEM_GROW_CLASS = 'flex-item--';
export const FLEX_GROW_FACTORS = [0,1,2,3,4,5,6,7];  // Supported grow factor values
export const FLEX_ITEM_FLUSH_CLASS = `${FLEX_ITEM_CLASS}--flush`;
export const FLEX_ITEM_NBSP_CLASS = `${FLEX_ITEM_CLASS}--nbsp`;
export const FLEX_ITEM_SECTION_CLASS = `${FLEX_ITEM_CLASS}--section`;

/**
 * Generates CSS class names for FlexItem component based on props.
 * Handles flex sizing, alignment, and spacing modifiers.
 * 
 * @param {Object} props - FlexItem component props
 * @returns {Array} Array of CSS class names to apply
 */
const getStyleKeys = (props) => {
	const {
		shrink,         // Boolean - shrink to content size
		growFactor,     // Number (0-7) - flex grow factor for space distribution
		isFirstChild,   // Boolean - apply first-child specific styling
		justify,        // String - flex justify-content for this item
		align,          // String - flex align-items for this item
		flush,          // Boolean - remove spacing around item
		nbsp,           // Boolean - use text-space-like spacing
		section,        // Boolean - use section-like spacing
		...other
	} = props;

	return [
		shrink ? FLEX_ITEM_SHRINK_CLASS : undefined,                    // flex-shrink: 1
		growFactor ? `${FLEX_ITEM_GROW_CLASS}${growFactor}` : undefined, // flex-grow: [factor]
		isFirstChild ? `${FLEX_ITEM_CLASS}--firstChild` : undefined,   // First child specific styles
		...[justify ? `${FLEX_JUSTIFY_CLASS}${justify}` : undefined],  // Item-level justify override
		...[align ? `${FLEX_ALIGN_CLASS}${align}` : undefined],        // Item-level align override
		...[flush ? FLEX_ITEM_FLUSH_CLASS : undefined],                // Remove spacing
		...[nbsp ? FLEX_ITEM_NBSP_CLASS : undefined],                  // Text-space-like spacing
		...[section ? FLEX_ITEM_SECTION_CLASS : undefined],            // Section-like spacing
	];
}

/**
 * Filters and resolves style keys to actual CSS styles.
 * Removes undefined values and maps to style objects.
 * 
 * @param {Array} styleKeys - Array of CSS class names
 * @param {Object} styles - Style object from ThemeContext
 * @returns {Array} Array of resolved style objects
 */
const getItemStyles = (styleKeys, styles) => {
	return styleKeys.map((key)=>{
		return styles[key];
	}).filter(function(item){
		return item !== undefined;
	});
}

/**
 * Individual flex item component that controls sizing, alignment, and spacing within Flex containers.
 * Provides fine-grained control over how items behave in flexbox layouts.
 * 
 * FlexItem is designed to work within Flex containers and provides:
 * - Flexible sizing with grow/shrink behavior
 * - Individual alignment overrides
 * - Spacing modifiers independent of container settings
 * - Performance-optimized style calculation
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.shrink] - Allow item to shrink smaller than content size
 * @param {number} [props.growFactor] - Flex grow factor (0-7) for space distribution
 * @param {boolean} [props.isFirstChild] - Apply first-child specific styling
 * @param {string} [props.justify] - Override container justify-content for this item
 * @param {string} [props.align] - Override container align-items for this item  
 * @param {boolean} [props.flush] - Remove spacing around this item
 * @param {boolean} [props.nbsp] - Use text-space-like spacing around this item
 * @param {boolean} [props.section] - Use section-like spacing around this item
 * @param {Object} [props.style] - Additional styles to apply
 * @param {Object} [props.dataSet] - Data attributes for media queries
 * @param {React.ReactNode} props.children - Content to display within the flex item
 * 
 * @example
 * // Basic flex layout with growing/shrinking items
 * <Flex>
 *   <FlexItem shrink><Text>Fixed width content</Text></FlexItem>
 *   <FlexItem growFactor={1}><TextInput placeholder="Grows to fill space" /></FlexItem>
 *   <FlexItem shrink><Button>Action</Button></FlexItem>
 * </Flex>
 * 
 * @example
 * // Proportional space distribution with grow factors
 * <Flex>
 *   <FlexItem growFactor={1}>One part</FlexItem>
 *   <FlexItem growFactor={2}>Two parts (twice as wide)</FlexItem>
 *   <FlexItem growFactor={1}>One part</FlexItem>
 * </Flex>
 * 
 * @example
 * // Individual item alignment overrides
 * <Flex align="center">
 *   <FlexItem><Text>Centered</Text></FlexItem>
 *   <FlexItem align="start"><Text>Top aligned</Text></FlexItem>
 *   <FlexItem align="end"><Text>Bottom aligned</Text></FlexItem>
 * </Flex>
 * 
 * @example
 * // Spacing control for specific items
 * <Flex>
 *   <FlexItem><Text>Normal spacing</Text></FlexItem>
 *   <FlexItem flush><Text>No spacing</Text></FlexItem>
 *   <FlexItem section><Text>Extra spacing</Text></FlexItem>
 * </Flex>
 */
const FlexItem = (props) => {
	const { styles } = useContext(ThemeContext);
		const {
			children,
			shrink,         // Boolean - allow shrinking
			growFactor,     // Number - flex grow factor (0-7)
			descendantStyles, // Legacy - styles for descendants
			isFirstChild,   // Boolean - first child styling
			justify,        // String - justify override
			align,          // String - align override
			style,          // Additional styles
			dataSet,        // Data attributes for media queries
			flush,          // Boolean - remove spacing
			nbsp,           // Boolean - text-space spacing
			section,        // Boolean - section-like spacing
			...other
		} = props;

		// Memoized style calculation for performance
		const styleKeys = useMemo(() => getStyleKeys(props), [shrink, growFactor, isFirstChild, justify, align, flush, nbsp, section]);
		const itemStyles = useMemo(()=> getItemStyles(styleKeys, styles), [styleKeys])
		const finalStyles = [styles[FLEX_ITEM_CLASS], itemStyles, style];

		return (
			<View style={finalStyles} dataSet={dataSet} {...other}>
				{children}
			</View>
		);
}

FlexItem.propTypes = {
	shrink: PropTypes.bool,
	growFactor: PropTypes.oneOf(FLEX_GROW_FACTORS),
};

export default FlexItem;
