import React, {useContext} from 'react';
import { View } from '../primitives';
import { useMediaContext } from './UseMediaContext';
import ThemeContext from '../ThemeContext';
import StyleSheet from 'react-native-media-query';
import { MEDIA_QUERIES } from '../styles/designConstants';
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

	// looks like we still need matchmedia for a few things
	// but in almost all cases, the list will look fine on ssr load
	const media = useMediaContext();
	const currentVariant = findWidestActiveValue(variant, media);
	const currentRenderItem = findWidestActiveValue(renderItem, media);

	// list styles
	const listStyleKeys = getStyleKeysForMediaQueryVariants("list--", variant);
	const { 
		activeStyles: listActiveStyles, 
		activeIds: listActiveIds 
	} = getActiveStyles(listStyleKeys, styles, ids);

	// list-item styles
	const listItemStyleKeys = [
		...getStyleKeysForMediaQueryVariants("list-item--", variant), 
		...getStyleKeysForMediaQueryVariants("list-item--grid--", itemsInRow),
	];
	
	const {
		activeStyles: listItemActiveStyles,
		activeIds: listItemActiveIds
	} = getActiveStyles(listItemStyleKeys, styles, ids);

	// FIXED WIDTH WHEN SCROLL ITEMS
	// without cascading, we have to get creative 
	const {styles: scrollItemStyles, ids: scollItemIds} = StyleSheet.create({
		'item': {
			...(()=>{
				const styleObj = {};
				Object.keys(MEDIA_QUERIES).forEach((key,index)=>{
					if(variant[key] == 'scroll'){
						styleObj[MEDIA_QUERIES[key]] = {
							width: scrollItemWidth,
							flexBasis: 'auto'
						}
					}
				});
				return styleObj;
			})()
		}
	});

	// render items
	const renderItems = (items, pageKey=0) => (items.map((item, i)=>{
		return (
			<View
				key={`${pageKey}-${i}`}
				accessibilityRole='listitem'
				style={[ listItemActiveStyles, scrollItemStyles.item, itemStyle ]}
				dataSet={{ media: listItemActiveIds+" "+scollItemIds.item}}
				>
				{ currentRenderItem(item, i) }
			</View>
		);
	}));


	return(
		<View style={styles[`list--${currentVariant}-wrap`]}>
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