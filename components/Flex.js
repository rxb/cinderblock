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

const getStyleKeys = (props, media) => {
			
	const {
		direction,
		switchDirection,
		reverseDirection,
		reverseSwitchDirection,
		wrap,
		justify,
		align,
		flush,
		nbsp,
	} = props;
	
	// direction
	// reverseDirection (bool)
	// switchDirection
	// reverseSwtichDirection (bool)
	let startKey, switchKey;
	if(direction == DIRECTION_COLUMN){
		startKey = FLEX_COLUMN_CLASS;
		switchKey = FLEX_ROW_CLASS;
	}
	else{
		startKey = FLEX_ROW_CLASS;
		switchKey = FLEX_COLUMN_CLASS;
	}
	startKey += (reverseDirection) ? 'Reverse' : '';
	switchKey += (reverseSwitchDirection) ? 'Reverse' : '';

	return [
		FLEX_CLASS,

		// starting direction
		startKey,

		// switched direction
		...[switchDirection ? `${switchKey}__${switchDirection}` : undefined],
		
		// other
		...[wrap ? FLEX_WRAP_CLASS : undefined],
		...[flush ? FLEX_FLUSH_CLASS : undefined],
		...[nbsp ? FLEX_NBSP_CLASS : undefined],

	]
}


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
