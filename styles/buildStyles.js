import {StyleSheet} from '../primitives';

import {FLEX_GROW_FACTORS, MEDIA_SIZES} from './designConstants';

const buildStyles = (METRICS, SWATCHES) => {

	const {
		base,
		space,
		borderRadius,
		cardBorderRadius
	} = METRICS;

	return StyleSheet.create({

		// LAYOUT
		stripe: {
			paddingVertical: space,
			//flex: 1,
		},
		'stripe--atMedium': {
			paddingVertical: space,
			paddingHorizontal: space,
		},
		/*
		'stripe--atLarge': {
			paddingHorizontal: space*1.5,
		},
		*/
		bounds: {
			maxWidth: METRICS.boundsWidth,
			minWidth: 1,
			marginHorizontal: 'auto',
			width: '100%',
		},

		section: {
			paddingTop: space,
			marginHorizontal: space,
			paddingBottom: 0,
		},

		'section--border': {
			borderTopWidth: 1,
			borderTopColor: SWATCHES.border,
			paddingTop: space  * 1.5,
			marginTop: space * .5
		},

		imageSnap: {
			marginHorizontal: 0,
			marginTop: -1 * space,
			resizeMode: 'cover',
			borderRadius: 0,
		},

		
		'imageSnap--atMedium': {
			marginTop: space / 2,
			marginHorizontal: space,
			borderRadius: 6
		},
		

		// for sets of chunks with no possibility of sections
		// basically, inside simple, small cards
		sectionless: {
			paddingTop: space,
			paddingHorizontal: space,
		},

		chunk: {
			paddingBottom: space
		},
		'chunk--border': {
			borderTopWidth: 1,
			borderTopColor: SWATCHES.border,
			paddingTop: space
		},


		// stacking up some inline
		inline: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			alignItems: 'center',
			minWidth: 0,
			overflow: 'hidden'
		},
		'inline--noWrap': {
			flexWrap: 'nowrap'
		},
		inlineItem: {
			marginLeft: space/3,
			overflow: 'hidden',
			minWidth: 0
		},
		'inlineItem--firstChild': {
			marginLeft: 0
		},


		// LISTS

		// default
		'list--linear':{

		},
		'list-item--linear': {
			borderTopWidth: 1,
			borderTopColor: SWATCHES.border,
			paddingTop: space
		},
		'list-item--linear--firstChild': {
			borderTopWidth: 0,
			paddingTop: space / 2
		},

		// grid

		'list--grid':{
			flexDirection: 'row',
			flexWrap: 'wrap',
			marginLeft: -1*space
		},
		'list-item--grid': {
			flexWrap: 'nowrap',
			paddingLeft: space,
			paddingTop: 0
		},
		...(()=>{
			const gridObj = {};
			for(let factor of [1,2,3,4,5,6,7,8]){
				gridObj[`list-item--grid--${factor}`] = { flexBasis: `${100/factor}%` };
			}
			return gridObj;
		})(),


		// inline

		'list--scroll':{
			flexDirection: 'row',
			flexWrap: 'nowrap',
			overflowX: 'scroll',
			WebkitOverflowScrolling: 'touch',
			paddingLeft: space - space,
			paddingRight: space,
			paddingBottom: 30,
			marginBottom: -30,
			overflow: 'hidden',
		},
		'list-item--scroll': {
			width: '45%',
			paddingLeft: space
		},
		'list--scroll-wrap': {
			overflow: 'hidden',
			marginHorizontal: -1 * space,
		},

		// INPUT
		input: {
			backgroundColor: SWATCHES.notwhite,
			borderColor: SWATCHES.border,
			borderWidth: 1,
			paddingHorizontal: 16,
			paddingVertical: 13, /* this has something to do with lineheight */
			borderRadius: borderRadius,
			color: SWATCHES.textPrimary,
			boxSizing: 'border-box',
			fontFamily: METRICS.fontFamily,
			marginVertical: METRICS.pseudoLineHeight,
		},
		'input--focus': {
			borderColor: SWATCHES.textHint,
			backgroundColor: 'transparent',
			boxShadow: `0 0 0 3px ${SWATCHES.focus}`
		},
		'input--multilineAndCounter': {
			paddingBottom: 13 + METRICS.bodySize
		},
		'input-icon': {
			position: 'absolute',
			right: 13,
			top: 0,
			height: '100%',
			justifyContent: 'center',
			pointerEvents: 'none'
		},

		// TOUCH
		'touch': {
			cursor: 'pointer'
		},


		// BUTTON
		button: {
			borderRadius: borderRadius,
			borderRadius: 500,
			userSelect: 'none',
			marginVertical: METRICS.pseudoLineHeight,
			//flexDirection: 'row',
			justifyContent: 'center',
			alignSelf: 'flex-start',
		},
		'button--small': {
			paddingHorizontal: 9, 
			paddingVertical: 9,
		},
		'button--medium': {
			paddingHorizontal: 13,
			paddingVertical: 13,
		},
		'button--large': {
			paddingHorizontal: 16,
			paddingVertical: 16,
		},
		'button--shrink': {},
		'button--iconOnly': {},
		'button--grow': {
			alignSelf: 'stretch',
			flex: 1
		},
		'button--primary': {
			backgroundColor: SWATCHES.buttonPrimaryBackground,
		},
		'button--secondary': {
			backgroundColor: SWATCHES.buttonSecondaryBackground,
		},
		'button--primaryInverted': {
			backgroundColor: SWATCHES.textPrimaryInverted,
		},
		'button--secondaryInverted': {
			backgroundColor: SWATCHES.textSecondaryInverted,
		},
		buttonContent: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			alignItems: 'center',
			justifyContent: 'center',
			minWidth: 0,
			overflow: 'hidden',
			flexWrap: 'nowrap'
		},
		buttonText: {
			textAlign: 'center',
			fontWeight: '600',
			whiteSpace: 'nowrap',
			marginHorizontal: 3
		},
		'buttonText--primary': {
			color: SWATCHES.buttonPrimaryInk,
		},
		'buttonText--secondary': {
			color: SWATCHES.buttonSecondaryInk,
		},
		'buttonText--primaryInverted': {
			color: SWATCHES.buttonPrimaryInvertedInk,
		},
		'buttonText--secondaryInverted': {
			color: SWATCHES.buttonSecondaryInvertedInk,
		},


		// CHIP
		chip: {
			backgroundColor: '#eee',
			paddingVertical: space*0.5,
			paddingHorizontal: space,
			borderRadius: 20,
			flex: 0,
			flexBasis: 0,
			minHeight: '-webkit-min-content',
			width: 'auto',
			minWidth: '-webkit-min-content'
		},
		chipText: {
			textAlign: 'center'
		},

		// CARD
		card: {
			borderRadius: cardBorderRadius,
			backgroundColor: 'white',
			borderWidth: 1,
			borderColor: SWATCHES.border,
			overflow: 'hidden',
		},

		'card--shadow': {
			borderWidth: 0,
			shadowRadius: 16,
			shadowColor: 'rgba(0,0,0,.15)'
		},

		// TABS
		tabs: {
			flexDirection: 'row',
			alignItems: 'stretch',
			width: '100%',
			borderBottomWidth: 1,
			borderBottomColor: SWATCHES.border,
		},
		tabItem: {
			minHeight: '-webkit-min-content',
			minWidth: '-webkit-min-content',
			paddingHorizontal: space,
			paddingBottom: 6
		},

		'tabItem--variableWidth':{
			flex: 0
		},

		'tabItem--fullWidth': {
			flex: 1,
			textAlign: 'center'
		},

		'tabItem--selected': {
			borderBottomColor: SWATCHES.tint,
			borderBottomWidth: 3,
			marginBottom: -1
		},
		'tabText--selected': {
			color: SWATCHES.tint
		},

		// MODAL
		'modal-container': {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 3,
			alignItems: 'center',
			justifyContent: 'center'
		},

		'modal-backdrop': {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'rgba(0,0,0,.75)',
			zIndex: 3
		},

		modal: {
			marginHorizontal: '5%',
			minWidth: 400,
			maxWidth: 600,
			maxHeight: `95%`,
			top: '5%',
			borderRadius: cardBorderRadius,
			backgroundColor: 'white',
			overflow: 'hidden',
			zIndex: 3
		},

		/*
		'modal--full': {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'white',
			zIndex: 3,
			minWidth: 'auto',
			maxWidth: 'auto'
		},
		*/

		// bottom sheet
		'modal--full': {
			position: 'fixed',
			maxHeight: '90%',
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'white',
			borderTopLeftRadius: cardBorderRadius,
			borderTopRightRadius: cardBorderRadius,
			overflow: 'hidden',
			zIndex: 3,
			minWidth: 'auto',
			maxWidth: 'auto'
		},

		prompt: {
			marginHorizontal: '5%',
			maxWidth: 340,
			minWidth: 300,
			maxHeight: `90%`,
			borderRadius: cardBorderRadius,
			backgroundColor: 'white',
			overflow: 'hidden',
			zIndex: 3
		},
		'menu-container': {
			width: '100%',
			height: 0,
			backgroundColor: 'red', // shouldn't be able to see this
			
		},
		menu: {
			position: 'absolute',
			top: METRICS.pseudoLineHeight,
			right: 0,
			backgroundColor: 'white',
			borderRadius: METRICS.borderRadius,
			shadowRadius: 12,
			shadowColor: 'rgba(0,0,0,.25)',
		},




		// AVATAR
		avatar: {
			resizeMode: 'cover',
			backgroundColor: SWATCHES.shade
		},
		'avatar--xsmall':{
			width: MEDIA_SIZES.xsmall,
			height: MEDIA_SIZES.xsmall,
			borderRadius: MEDIA_SIZES.xsmall
		},
		'avatar--small':{
			width: MEDIA_SIZES.small,
			height: MEDIA_SIZES.small,
			borderRadius: MEDIA_SIZES.small
		},
		'avatar--medium':{
			width: MEDIA_SIZES.medium,
			height: MEDIA_SIZES.medium,
			borderRadius: MEDIA_SIZES.medium
		},
		'avatar--large':{
			width: MEDIA_SIZES.large,
			height: MEDIA_SIZES.large,
			borderRadius: MEDIA_SIZES.large
		},
		'avatar--xlarge':{
			width: MEDIA_SIZES.xlarge,
			height: MEDIA_SIZES.xlarge,
			borderRadius: MEDIA_SIZES.xlarge
		},

		// PICTURE
		picture: {
			resizeMode: 'cover',
			backgroundColor: SWATCHES.shade,
			borderRadius: METRICS.borderRadius
		},
		'picture--xsmall':{
			width: MEDIA_SIZES.xsmall,
			height: MEDIA_SIZES.xsmall,
		},
		'picture--small':{
			width: MEDIA_SIZES.small,
			height: MEDIA_SIZES.small,
		},
		'picture--medium':{
			width: MEDIA_SIZES.medium,
			height: MEDIA_SIZES.medium,
		},
		'picture--large':{
			width: MEDIA_SIZES.large,
			height: MEDIA_SIZES.large,
		},
		'picture--xlarge':{
			width: MEDIA_SIZES.xlarge,
			height: MEDIA_SIZES.xlarge,
		},

		// TEXT
		text: {
			fontFamily: METRICS.fontFamily,
			fontWeight: '400',
			WebkitFontSmoothing: 'antialiased', // retina/non-retina rendering
			letterSpacing: '0.01em'
		},
		textPrimary: {
			color: SWATCHES.textPrimary,
		},
		textSecondary:{
			color: SWATCHES.textSecondary
		},
		textHint:{
			color: SWATCHES.textHint
		},
		'textPrimary--inverted': {
			color: SWATCHES.textPrimaryInverted,
		},
		'textSecondary--inverted':{
			color: SWATCHES.textSecondaryInverted
		},
		'textHint--inverted':{
			color: SWATCHES.textHintInverted
		},
		textTint:{
			color: SWATCHES.tint,
		},
		textStrong: {
			fontWeight: '600',
		},
		textMicro: {
			fontSize: METRICS.microSize,
			lineHeight: METRICS.microLineHeight,
		},
		textSmall: {
			fontSize: METRICS.smallSize,
			lineHeight: METRICS.smallLineHeight,
		},
		textBody: {
			fontSize: METRICS.bodySize,
			lineHeight: METRICS.bodyLineHeight,
		},
		textBig: {
			fontSize: METRICS.bigSize,
			lineHeight: METRICS.bigLineHeight,
			fontWeight: '600'
		},
		textSectionHead: {
			fontFamily: METRICS.fontFamily,
			fontSize: METRICS.sectionHeadSize,
			lineHeight: METRICS.sectionHeadLineHeight,
			fontWeight: '600',
			letterSpacing: '-.001em',
		},
		textPageHead: {
			fontFamily: METRICS.fontFamily,
			fontSize: METRICS.pageHeadSize,
			lineHeight: METRICS.pageHeadLineHeight,
			fontWeight: '700',
			letterSpacing: '-.001em',
		},
		'textPageHead--atLarge': {
			fontSize: METRICS.pageHeadAtLargeSize,
			lineHeight: METRICS.pageHeadAtLargeLineHeight,
		},
		textHero: {
			fontFamily: METRICS.fontFamily,
			fontSize: METRICS.heroSize,
			lineHeight: METRICS.heroLineHeight,
			fontWeight: '700',
			letterSpacing: '-.001em',
		},
		'textHero--atLarge': {
			fontSize: METRICS.heroAtLargeSize,
			lineHeight: METRICS.heroAtLargeLineHeight,
		},
		textLabel: {
			marginTop: 4,
			marginBottom: 0,
			fontWeight: '600',

		},
		textError: {
			color: SWATCHES.error,
		},
		textNowrap: {
			whiteSpace: 'nowrap'
		},

		// HEADER
		header: {
			zIndex: 1,
			top: 0,
			left: 0,
			right: 0,	
			backgroundColor: 'white',
			borderBottomColor: SWATCHES.border,
			borderBottomWidth: 1,
		},
		'header--atMedium': {
			paddingHorizontal: space*.75,
		},

		// HEADER SECTION
		'header-section': {
			justifyContent: 'center',
			paddingHorizontal: METRICS.space,
			height: 56
		},
		'header-section--atMedium': {
			paddingHorizontal: METRICS.space,
			height: 64,
		},

		// HEADER TYPES
		// headerTransparent must be placed inside the first stripe
		// paddingTop on first stripe needs to be 0
		// if a pagewrap is used for other pages, might need to hide the standard header
		'headerTransparent': {
			backgroundColor: 'transparent',
			borderBottomWidth: 0,
		},
		'headerTransparent--atMedium': {
			paddingHorizontal: 0,
		},


		// DROPDOWN
		dropdowner: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			zIndex: 3,
		},

		// TOASTER
		toaster: {
			position: 'fixed',
			bottom: 0,
			left: 0,
			right: 0,
			zIndex: 3,
		},
		'toaster-inner': {
			maxWidth: 600,
			marginHorizontal: 'auto',
			//width: '100%',
			height: 0,
			overflow: 'visible',
			justifyContent: 'flex-end'
		},
		toast: {
			padding: space,
			backgroundColor: SWATCHES.backgroundDark,
			borderRadius: METRICS.borderRadius,
			marginBottom: space,
			marginHorizontal: space,
			width: 'auto',
			flex: 1,
			boxShadow: '0 0 0 1px rgba(255,255,255,.25)',
			shadowRadius: 12,
			shadowColor: 'rgba(0,0,0,.25)',
		},

		// MODIFIERS
		pseudoLineHeight: {
			marginVertical: METRICS.pseudoLineHeight,
		},
		absoluteCenter: {
			position: 'absolute', 
			top: 0, 
			left: 0, 
			right: 0, 
			bottom: 0, 
			alignItems: 'center', 
			justifyContent: 'center'
		},
		visibilityHidden: {
			visibility: 'hidden'
		},
		visibilityVisible: {
			visibility: 'visible'
		},

		// Flex


		'flex' : {
			alignItems: 'stretch',
			flexDirection: 'row',
			marginLeft: -1*base,
		},

		'flex--row' : {
			flexDirection: 'row',
		},

		'flex--column': {
			flexDirection: 'column',
			height: '100%'
		},

		// FlexItem

		'flex-item' : {
			width: 'auto',
			flex: 1,
			flexBasis: 0,
			minHeight: '-webkit-min-content',
			minWidth: '-webkit-min-content',
			paddingLeft: base,
		},


		// FLEX GROW FACTORS

		...(()=>{
			const growObj = {};
			for(let factor of FLEX_GROW_FACTORS){
				growObj[`flex-item--${factor}`] = { flex: factor };
			}
			return growObj;
		})(),

		'flex-item--shrink': {
			flex: 0,
			minWidth: '-webkit-min-content'
		},


		// FLEX VARIANTS
		'flex--flush': {
			marginLeft: 0,
		},
		'flex-item--flush': {
			paddingLeft: 0,
		},
		'flex--nbsp': {
			marginLeft: -1 * METRICS.pseudoLineHeight * 2,
		},
		'flex-item--nbsp': {
			paddingLeft: METRICS.pseudoLineHeight * 2,
		},

		'flex--wrap': {
			flexWrap: 'wrap'
		},

		'flex--columnReverse': {
			flexDirection: 'column-reverse'
		},

		'flex--rowReverse': {
			flexDirection: 'row-reverse'
		},

		// JUSTIFY
		'flex--justify-flex-start': {
			justifyContent: 'flex-start'
		},
		'flex--justify-center': {
			justifyContent: 'center'
		},
		'flex--justify-flex-end': {
			justifyContent: 'flex-end'
		},

		// ALIGN
		'flex--align-flex-start': {
			alignItems: 'flex-start'
		},
		'flex--align-center': {
			alignItems: 'center'
		},
		'flex--align-flex-end': {
			alignItems: 'flex-end'
		},




	});
}

export default buildStyles;


/*
PLAUSIBLE THEMING
export design constants and a function that returns styles
this can be used to generate a new constanted styles object
and has the opportunity to add overrides
this entire thing gets passed into context and overrides the default context
which is base styles with default designcontstants
objects pull styles from context 
OR maybe there's no default context and each component falls back to the default within itself.
not really sure
*/