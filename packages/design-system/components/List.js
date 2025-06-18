import React, {useContext} from 'react';
import { View } from '../primitives';
import { useMediaContext } from './UseMediaContext';
import ThemeContext from '../ThemeContext';
import StyleSheet from 'react-native-media-query';
import { MEDIA_QUERIES } from '../styles/designConstants';
import {getActiveStyles, getStyleKeysForMediaQueryVariants} from '../utils';
import {findWidestActiveValue} from '../utils';

/**
 * Flexible list component with responsive layout variants (linear, grid, scroll).
 * Supports responsive grid configurations and adaptive item rendering.
 * 
 * @param {Object} props - Component props
 * @param {Object|string} [props.variant='linear'] - Layout variant: 'linear', 'grid', 'scroll', or responsive object
 * @param {Object} [props.itemsInRow={}] - Grid layout: items per row at each breakpoint
 * @param {Array} [props.items=[]] - Array of data items to render
 * @param {Function} [props.renderItem] - Function to render each item, can be responsive object
 * @param {number} [props.scrollItemWidth] - Fixed width for scroll variant items
 * @param {boolean} [props.paginated=false] - Whether items are paginated
 * @param {boolean} [props.linearFirstChildPlain=true] - Remove styling from first item in linear variant
 * @param {string} [props.listIds] - Additional CSS class IDs for list container
 * @param {string} [props.itemIds] - Additional CSS class IDs for list items
 * @param {Object} [props.style] - Additional styles for list container
 * @param {Object} [props.itemStyle] - Additional styles for list items
 * @param {React.ReactNode} [props.children] - Child components (alternative to items/renderItem)
 * 
 * @example
 * // Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop
 * <List 
 *   variant={{ small: 'linear', medium: 'grid' }}
 *   itemsInRow={{ mobile: 1, tablet: 2, desktop: 4 }}
 *   items={products}
 *   renderItem={(product) => <ProductCard product={product} />}
 * />
 * 
 * @example
 * // Horizontal scroll on mobile, grid on desktop
 * <List
 *   variant={{ small: 'scroll', large: 'grid' }}
 *   scrollItemWidth={200}
 *   items={images}
 *   renderItem={(image) => <ImageCard image={image} />}
 * />
 */
const List = (props) => {
	const { styles, ids } = useContext(ThemeContext);

	const {
		children,               // Child components (used instead of items/renderItem)
		scrollItemWidth,        // Fixed width for items in scroll variant
		itemsInRow = {},        // Grid configuration: { mobile: 1, tablet: 2, desktop: 4 }
		variant = 'linear',     // Layout variant: 'linear' | 'grid' | 'scroll' | responsive object
		items = [],             // Array of data to render
		renderItem = item => item, // Function to render each item (can be responsive)
		listIds = "",           // Additional CSS classes for list container
		itemIds = "",           // Additional CSS classes for list items
		style,                  // Additional styles for list container
		itemStyle,              // Additional styles for list items
		paginated = false,      // Whether items are paginated (nested array structure)
		linearFirstChildPlain = true, // Remove first-child styling in linear variant
		...other
	} = props;

	// RESPONSIVE VARIANT RESOLUTION
	// Use media queries to determine current active variant and render function
	// This allows for SSR-friendly rendering in most cases
	const media = useMediaContext();
	const currentVariant = findWidestActiveValue(variant, media);
	const currentRenderItem = findWidestActiveValue(renderItem, media);

	// LIST CONTAINER STYLES
	// Generate CSS classes for list container based on variant
	// Example: variant={{ small: 'linear', large: 'grid' }} becomes ['list--linear__small', 'list--grid__large']
	const listStyleKeys = getStyleKeysForMediaQueryVariants("list--", variant);
	const { 
		activeStyles: listActiveStyles, 
		activeIds: listActiveIds 
	} = getActiveStyles(listStyleKeys, styles, ids);

	// LIST ITEM STYLES
	// Combine variant-based styling with grid configuration
	const listItemStyleKeys = [
		// Variant styles: controls layout behavior (flex, grid, scroll direction)
		...getStyleKeysForMediaQueryVariants("list-item--", variant), 
		// Grid styles: controls items per row (width percentages, gaps)
		...getStyleKeysForMediaQueryVariants("list-item--grid--", itemsInRow),
	];
	const {
		activeStyles: listItemActiveStyles,
		activeIds: listItemActiveIds
	} = getActiveStyles(listItemStyleKeys, styles, ids);

	// FIRST CHILD STYLING (Linear variant only)
	// In linear lists, first item often needs different styling (no top border, etc.)
	let listItemFirstChildActiveStyles, listItemFirstChildActiveIds;
	if(linearFirstChildPlain){
		const listItemFirstChildStyleKeys = getStyleKeysForMediaQueryVariants("list-item-firstChild--", variant);
		const { activeStyles, activeIds} = getActiveStyles(listItemFirstChildStyleKeys, styles, ids);
		listItemFirstChildActiveStyles = activeStyles;
		listItemFirstChildActiveIds = activeIds;
	}
	else{
		listItemFirstChildActiveStyles = [];
		listItemFirstChildActiveIds = "";
	}

	// FIXED WIDTH WHEN SCROLL ITEMS
	// without cascading, we have to get creative 
	const getVariantChildStyles = (variant, childStyles) => {
		const styleObj = {};
		Object.keys(MEDIA_QUERIES).forEach((key,index)=>{
			if(variant[key] == 'scroll'){
				styleObj[MEDIA_QUERIES[key]] = childStyles
			}
		});
		return styleObj;
	};

	const {styles: scrollItemStyles, ids: scrollItemIds} = StyleSheet.create({
		'item': getVariantChildStyles('scroll', {
			width: scrollItemWidth,
			flexBasis: 'auto'
		})
	});


	// render items
	const renderItems = (items, pageKey=0) => (items.map((item, i)=>{
		return (
			<View
				key={`${pageKey}-${i}`}
				accessibilityRole='listitem'
				style={[ 
					listItemActiveStyles, 
					scrollItemStyles.item, 
					itemStyle, 
					(i==0) ? listItemFirstChildActiveStyles : null 
				]}
				dataSet={{ media: listItemActiveIds+" "+scrollItemIds.item+" "+((i==0 && pageKey==0) ? listItemFirstChildActiveIds : "")+" "+itemIds}}
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
				dataSet={{ media: listActiveIds+" "+listIds}}
				>
				{ paginated && items.map( (page, i) => renderItems(page.items, i) )}
				{ !paginated && renderItems(items) }
				{children}
			</View>
		</View>
	);
}

export default List;