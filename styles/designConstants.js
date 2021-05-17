import { Easing } from '../primitives';

export const SWATCHES = {
	textPrimary: 'rgba(0,0,0,.87)',
	textSecondary: 'rgba(0,0,0,.57)',
	textHint: 'rgba(0,0,0,.33)',
	textPrimaryInverted: '#ffffff',
	textSecondaryInverted: 'rgba(255,255,255,0.7)',
	textHintInverted: 'rgba(255,255,255,0.5)',
	shade: 'rgba(0,0,0,.06)',
	shadeInverted: 'rgba(255,255,255,0.5)',
	notwhite: 'rgba(0,0,0,.015)',
	tint: '#4353ff',
	focus: 'rgba(0,122,255,.25)',
	error: 'red',
	border: 'rgba(0,0,0,.15)',
	backgroundWhite: '#fff',
	backgroundDark: '#222',
	backgroundShade: '#fafafa',
	get buttonPrimaryBackground() {
		return this.tint
	},
	get buttonSecondaryBackground() {
		return this.shade
	},
	get buttonPrimaryInvertedBackground() {
		return this.textPrimaryInverted
	},
	get buttonSecondaryInvertedBackground() {
		return this.shadeInverted
	},
	get buttonPrimaryInk() {
		return this.textPrimaryInverted
	},
	get buttonSecondaryInk() {
		return this.tint
	},
	get buttonPrimaryInvertedInk() {
		return this.textPrimary
	},
	get buttonSecondaryInvertedInk() {
		return this.textPrimaryInverted
	}
}


export const METRICS = {
	base: 16,
	get space() {
		return this.base * 1.25
	},
	get spaceSection() {
		return this.space * 2
	},
	get bodySize() {
		return this.base
	},
	get bodyLineHeight() {
		return this.base * 1.55
	},
	get smallSize() {
		return this.base * 0.875
	},
	get smallLineHeight() {
		return this.smallSize * 1.6
	},
	get microSize() {
		return this.base * 0.675
	},
	get microLineHeight() {
		return this.microSize * 1.75
	},
	get bigSize() {
		return this.base * 1.25
	},
	get bigLineHeight() {
		return this.bigSize * 1.4
	},
	get sectionHeadSize() {
		return this.base * 1.5
	},
	get sectionHeadLineHeight() {
		return this.sectionHeadSize * 1.25
	},
	get pageHeadSize() {
		return this.base * 2.25 
	},
	get pageHeadLineHeight() {
		return this.pageHeadSize * 1.15
	},
	get heroSize() {
		return this.base * 3.25
	},
	get heroLineHeight() {
		return this.heroSize * 1.05
	},
	get pageHeadAtLargeSize() {
		return this.base * 3 
	},
	get pageHeadAtLargeLineHeight() {
		return this.pageHeadAtLargeSize * 1.2
	},
	get heroAtLargeSize() {
		return this.base * 3.85
	},
	get heroAtLargeLineHeight() {
		return this.heroAtLargeSize * 1.05
	},
	get pseudoLineHeight(){
		return 6
	},
	borderRadius: 5,
	cardBorderRadius: 10,
	boundsWidth: 1100,
	fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
}

export const FLEX_GROW_FACTORS = [1, 2, 3, 4, 5, 6, 7];

export const FLEX_JUSTIFY_VALUES = [
	"flex-end",
	"center",
	"space-between",
	"space-around"
]

export const FLEX_ALIGN_VALUES = [
	"flex-start",
	"flex-end",
	"center"
];


export const BREAKPOINT_SIZES = {
	"small": 0,
	"medium": 480,
	"large": 840,
	"xlarge": 1024
}

export const MEDIA_QUERY_PARAMS = {
	small: 	`screen`,
	medium: 	`screen and (min-width: ${BREAKPOINT_SIZES.medium}px)`,
	large: 	`screen and (min-width: ${BREAKPOINT_SIZES.large}px)`,
	xlarge: 	`screen and (min-width: ${BREAKPOINT_SIZES.xlarge}px)`
}

export const MEDIA_QUERIES = {
	small: `@media ${MEDIA_QUERY_PARAMS.small}`,
	medium: `@media ${MEDIA_QUERY_PARAMS.medium}`,
	large: `@media ${MEDIA_QUERY_PARAMS.large}`,
	xlarge: `@media ${MEDIA_QUERY_PARAMS.xlarge}`
};

export const MEDIA_SIZES = {
	xsmall: 16,		// text character size
	small: 24,		// comment reply avatar
	medium: 48,		// comment avatar		
	large: 64,		// semi-hero, author/host
	xlarge: 128 	// hero
};

export const TEXT_TYPES = {
	micro: 'Micro',
	small: 'Small',
	body: 'Body',
	big: 'Big',
	sectionHead: 'SectionHead',
	pageHead: 'PageHead',
	hero: 'Hero'
}

export const TEXT_COLORS = {
	primary: 'Primary',
	secondary: 'Secondary',
	hint: 'Hint',
	tint: 'Tint'
}

export const TEXT_WEIGHTS = {
	strong: 'Strong',
}

// Apple Easing https://github.com/expo/react-apple-easing/blob/master/AppleEasing.js
const EPSILON = 1e-9;
export const EASE = Easing.bezier(0.25, 0.1, 0.25, 1, EPSILON);