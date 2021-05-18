import React, {useContext} from 'react';
import { View } from '../primitives';
import { useMediaContext } from './UseMediaContext';
import ThemeContext from '../ThemeContext';
import {getActiveStyles, getStyleKeysForMediaQueryVariants} from '../utils';
import {findWidestActiveValue} from '../utils';


const List = (props) => {
	const { styles, ids } = useContext(ThemeContext);

	const {
		children,
		scrollItemWidth,
		itemsInRow = {},
		variant = 'linear',
		items = [],
		renderItem = item => item,
		style,
		itemStyle,
		paginated = false,
		...other
	} = props;

	const media = useMediaContext();

	const currentVariant = findWidestActiveValue(variant, media);
	const currentItemsInRow = findWidestActiveValue(itemsInRow, media);
	const currentRenderItem = findWidestActiveValue(renderItem, media);

	// TODO: remove
	const baseClass = `list--${currentVariant}`; 

	// list styles
	const listStyleKeys = getStyleKeysForMediaQueryVariants("list--", variant);
	const { 
		activeStyles: listActiveStyles, 
		activeIds: listActiveIds 
	} = getActiveStyles(listStyleKeys, styles, ids);
	

	// list-item styles
	const itemBaseClass = `list-item--${currentVariant}`;
	const listItemStyleKeys = [
		...[getStyleKeysForMediaQueryVariants("list-item--", variant)],
		...[getStyleKeysForMediaQueryVariants("list-item--grid", itemsInRow)],
	];
	const {
		activeStyles: listItemActiveStyles,
		activeIds: listItemActiveIds
	} = getActiveStyles(listItemStyleKeys, styles, ids);
	const scrollItemWidthStyle = (currentVariant == 'scroll' && scrollItemWidth) ? {width: scrollItemWidth} : undefined;

	// render items
	const renderItems = (items, pageKey=0) => (items.map((item, i)=>{
		const firstChildStyle = (i == 0) ? styles[`${itemBaseClass}--firstChild`] : undefined;
		return (
			<View
				key={`${pageKey}-${i}`}
				accessibilityRole='listitem'
				style={[ listItemActiveStyles, scrollItemWidthStyle, itemStyle, firstChildStyle ]}
				dataSet={{ media: listItemActiveIds}}
				>
				{ currentRenderItem(item, i) }
			</View>
		);
	}));


	return(
		<View style={styles[`${baseClass}-wrap`]}>
			<View
				accessibilityRole='list'
				style={[ listActiveStyles, style ]}
				dataSet={{ media: listActiveIds}}

				>
				{ paginated && items.map( (page, i) => renderItems(page.items, i) )}
				{ !paginated && renderItems(items) }
				{children}
			</View>
		</View>
	);
}

export default List;