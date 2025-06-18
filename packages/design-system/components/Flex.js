import React, {useMemo, useContext} from 'react';
import { View } from '../primitives';
import ThemeContext from '../ThemeContext';
import { BREAKPOINT_SIZES, FLEX_ALIGN_VALUES, FLEX_JUSTIFY_VALUES} from '../styles/designConstants';
import {getActiveStyles} from '../utils';


export const DIRECTION_ROW = 'row';
export const DIRECTION_COLUMN = 'column';

export const FLEX_CLASS = 'flex';
export const FLEX_ROW_CLASS = `${FLEX_CLASS}--${DIRECTION_ROW}`;
export const FLEX_COLUMN_CLASS = `${FLEX_CLASS}--${DIRECTION_COLUMN}`;
export const FLEX_WRAP_CLASS = `${FLEX_CLASS}--wrap`;
export const FLEX_ALIGN_CLASS = `${FLEX_CLASS}--align`;
export const FLEX_FLUSH_CLASS = `${FLEX_CLASS}--flush`;
export const FLEX_NBSP_CLASS = `${FLEX_CLASS}--nbsp`;
export const FLEX_SECTION_CLASS = `${FLEX_CLASS}--section`;


/**
 * Generates CSS class names for Flex component based on responsive props.
 * Handles direction switching, alignment, spacing, and other flex behaviors.
 * 
 * @param {Object} props - Flex component props
 * @param {Object} media - Media context (unused but kept for consistency)
 * @returns {string[]} Array of CSS class names to apply
 */
const getStyleKeys = (props, media) => {
			
	const {
		direction,          // 'row' | 'column' - starting flex direction (default: 'row')
		switchDirection,    // breakpoint name where direction switches (e.g., 'large')
		reverseDirection,   // boolean - reverse the starting direction
		reverseSwitchDirection, // boolean - reverse the switched direction
		wrap,               // boolean - allow flex items to wrap
		justify,            // flex justify-content value
		align,              // flex align-items value  
		flush,              // boolean - remove spacing between items
		nbsp,               // boolean - use text-space-like spacing
		section             // boolean - use section-like spacing
	} = props;
	
	// Determine starting and switching direction classes
	// If direction='row', switchDirection makes it column at breakpoint
	// If direction='column', switchDirection makes it row at breakpoint
	let startKey, switchKey;
	if(direction == DIRECTION_COLUMN){
		startKey = FLEX_COLUMN_CLASS;  // 'flex--column'
		switchKey = FLEX_ROW_CLASS;    // 'flex--row'
	}
	else{
		startKey = FLEX_ROW_CLASS;     // 'flex--row' (default)
		switchKey = FLEX_COLUMN_CLASS; // 'flex--column'
	}
	
	// Add 'Reverse' suffix for reverse directions
	startKey += (reverseDirection) ? 'Reverse' : '';
	switchKey += (reverseSwitchDirection) ? 'Reverse' : '';

	return [
		FLEX_CLASS, // Base 'flex' class

		// Starting direction (applies from mobile up)
		startKey,

		// Switched direction (applies at specified breakpoint)
		// Example: 'flex--column__large' = switch to column at large breakpoint
		...[switchDirection ? `${switchKey}__${switchDirection}` : undefined],
		
		// Spacing modifiers (default spacing is METRICS.space)
		...[flush ? FLEX_FLUSH_CLASS : undefined],    // Remove spacing - items flush together
		...[nbsp ? FLEX_NBSP_CLASS : undefined],      // Text-space-like spacing between items
		...[section ? FLEX_SECTION_CLASS : undefined], // Section-like spacing between items

		// Layout modifiers
		...[wrap ? FLEX_WRAP_CLASS : undefined],      // Allow items to wrap to new lines


	]
}


/**
 * Flexible container component with responsive direction switching capabilities.
 * 
 * The Flex component provides a powerful responsive layout system where you can:
 * - Set a starting direction (row/column) that applies from mobile up
 * - Switch to a different direction at a specific breakpoint
 * - Control spacing, alignment, and wrapping behavior
 * 
 * @param {Object} props - Component props
 * @param {('row'|'column')} [props.direction='row'] - Starting flex direction
 * @param {string} [props.switchDirection] - Breakpoint name to switch direction ('small'|'medium'|'large'|'xlarge')
 * @param {boolean} [props.reverseDirection] - Reverse the starting direction
 * @param {boolean} [props.reverseSwitchDirection] - Reverse the switched direction  
 * @param {boolean} [props.wrap] - Allow items to wrap to new lines
 * @param {string} [props.justify] - Flex justify-content value
 * @param {string} [props.align] - Flex align-items value
 * @param {boolean} [props.flush] - Remove spacing between items
 * @param {boolean} [props.nbsp] - Use text-space-like spacing
 * @param {boolean} [props.section] - Use section-like spacing
 * @param {Object} [props.style] - Additional styles to apply
 * @param {React.ReactNode} props.children - Child components
 * 
 * @example
 * // Basic responsive layout: row on mobile, column on large screens
 * <Flex switchDirection="large">
 *   <FlexItem>Left content</FlexItem>
 *   <FlexItem>Right content</FlexItem>
 * </Flex>
 * 
 * @example  
 * // Start as column, switch to row at medium breakpoint
 * <Flex direction="column" switchDirection="medium" align="center">
 *   <FlexItem>Top item</FlexItem>
 *   <FlexItem>Bottom item</FlexItem>
 * </Flex>
 */
const Flex = (props) => {
	const { styles, ids } = useContext(ThemeContext);

		const { children, style } = props;

		const styleKeys = useMemo(()=> getStyleKeys(props), [props]);
		const {activeStyles, activeIds} = useMemo(()=> getActiveStyles(styleKeys, styles, ids), [styleKeys])

		return (
			<View 
				style={[activeStyles, style]}
				dataSet={{ media: activeIds }}
				>
				{children}
			</View>
		);

}

const BREAKPOINTS = Object.keys(BREAKPOINT_SIZES);


Flex.defaultProps = {
	direction: DIRECTION_ROW,
};

export default Flex;
