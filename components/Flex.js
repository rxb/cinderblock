import React, {useMemo, useContext} from 'react';
import { View } from '../primitives';
import ThemeContext from '../ThemeContext';
import { BREAKPOINT_SIZES, FLEX_ALIGN_VALUES, FLEX_JUSTIFY_VALUES} from '../styles/designConstants';
import {useMediaContext} from './UseMediaContext';


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
		wrap,
		justify,
		align,
		rowReverse,
		flush,
		nbsp,
		columnReverse
	} = props;

	const isColumn = direction === DIRECTION_COLUMN;
	
	return [
		FLEX_CLASS,

		// horizontal default
		...[!isColumn ? FLEX_ROW_CLASS : undefined],
		...[!isColumn && switchDirection ? `${FLEX_COLUMN_CLASS}__${switchDirection}`: undefined],
		//...[!isColumn && switchDirection && media[switchDirection] ? FLEX_COLUMN_CLASS : undefined],
		

		// vertical default
		...[isColumn ? FLEX_COLUMN_CLASS : undefined],
		...[isColumn && switchDirection ? `${FLEX_ROW_CLASS}__${switchDirection}` : undefined],
		//...[isColumn && switchDirection && media[switchDirection] ? FLEX_ROW_CLASS : undefined],
		
		// reverse breakpoint modifiers
		...[rowReverse && media[rowReverse] ? 'flex--rowReverse' : undefined],
		...[columnReverse && media[columnReverse] ? 'flex--columnReverse' : undefined],

		// other
		...[wrap ? FLEX_WRAP_CLASS : undefined],
		...[flush ? FLEX_FLUSH_CLASS : undefined],
		...[nbsp ? FLEX_NBSP_CLASS : undefined],

	]
}

const getActiveStyles = (styleKeys, styles, ids) => {
	return{ 
		activeStyles: styleKeys.map((key, i)=>{
			return styles[key];
		}),
		activeIds: styleKeys.map((key, i)=>{
			return ids[key];
		}).join(' ')
	};
}

const Flex = (props) => {
	const { styles, ids } = useContext(ThemeContext);

		const { children, style } = props;

		const media = useMediaContext();
		const styleKeys = useMemo(()=> getStyleKeys(props, media), [media]);
		
		const {activeStyles, activeIds} = useMemo(()=> getActiveStyles(styleKeys, styles, ids), [styleKeys])

		console.log(activeIds)

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
