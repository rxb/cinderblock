import styleConfig from './index';

/**
 * An opt-in visual direction for testing Cinderblock's next default rhythm.
 *
 * This preset intentionally keeps the public API small. It changes the existing
 * structural roles (Chunk, Section, Stripe) instead of introducing a ladder of
 * arbitrary spacing utilities. Consumers can wrap an individual route in a
 * ThemeContext provider while evaluating it.
 */
const METRICS = {
	...styleConfig.METRICS,
	space: 16,
	spaceChunk: 16,
	spaceChunkAtLarge: 20,
	spaceSection: 16,
	spaceSectionAtLarge: 24,
	spaceStripe: 24,
	spaceStripeAtLarge: 32,
	pageGutter: 16,
	pageGutterAtLarge: 48,
	stripeHorizontalGutter: 0,
	borderRadius: 10,
	cardBorderRadius: 16,
	boundsWidth: 1440,
	pageHeadSize: 38,
	get pageHeadLineHeight() {
		return this.pageHeadSize * 1.15;
	},
	pageHeadAtLargeSize: 64,
	get pageHeadAtLargeLineHeight() {
		return this.pageHeadAtLargeSize * 1.2;
	},
	heroSize: 48,
	heroLineHeight: 52,
	heroAtLargeSize: 76,
	heroAtLargeLineHeight: 80,
	textStrongWeight: 700,
	textLabelWeight: 700,
	textBigWeight: 700,
	textSectionHeadWeight: 700,
	textPageHeadWeight: 800,
	textHeroWeight: 800,
	textPageHeadKickerWeight: 800,
	pageHeadKickerLetterSpacing: 1.5,
	heroLetterSpacing: -1.9,
	heroAtLargeLetterSpacing: -4.2,
	fontFamily: `'Plus Jakarta Sans', ${styleConfig.METRICS.fontFamily}`
};

const SWATCHES = {
	...styleConfig.SWATCHES,
	textPrimary: '#202522',
	textSecondary: '#636b66',
	textHint: '#929892',
	tint: '#226b4a',
	focus: 'rgba(34, 107, 74, 0.18)',
	error: '#9f3535',
	border: '#d7dbd6',
	borderSecondary: '#e8ebe7',
	backgroundWhite: '#fffefa',
	backgroundShade: '#f4f5ef',
	notwhite: '#fafaf6',
	shade: '#edf0ea',

	// Experimental semantic surfaces. Components do not consume these yet,
	// but test beds can use them without inventing page-specific colors.
	canvas: '#f4f5ef',
	surface: '#fffefa',
	positive: '#226b4a',
	positiveSoft: '#e4f1e9',
	warning: '#8a5a0a',
	warningSoft: '#fff1ca',
	critical: '#9f3535',
	criticalSoft: '#f8e6e3',
	info: '#70489a',
	infoSoft: '#eee7f5',

	// Object spread resolves the base getters, so rebind derived controls to
	// the experimental palette explicitly.
	buttonPrimaryBackground: '#226b4a',
	buttonSecondaryBackground: '#edf0ea',
	buttonPrimaryInvertedBackground: '#ffffff',
	buttonSecondaryInvertedBackground: 'rgba(255,255,255,0.5)',
	buttonPrimaryInk: '#ffffff',
	buttonSecondaryInk: '#226b4a',
	buttonPrimaryInvertedInk: '#202522',
	buttonSecondaryInvertedInk: '#ffffff'
};

const experimentalStyleConfig = {
	...styleConfig,
	METRICS,
	SWATCHES,
	...styleConfig.buildStyles(METRICS, SWATCHES)
};

export default experimentalStyleConfig;
