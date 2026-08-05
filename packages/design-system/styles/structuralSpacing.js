/**
 * Resolve the semantic spacing values used by Cinderblock's structural
 * components. Legacy themes only define `space` and `spaceSection`; the
 * fallbacks preserve their existing geometry.
 */
export const resolveStructuralMetrics = (METRICS) => {
	const chunkSpace = METRICS.spaceChunk ?? METRICS.space;
	const chunkSpaceAtLarge = METRICS.spaceChunkAtLarge ?? chunkSpace;
	const sectionSpace = METRICS.spaceSection ?? chunkSpace;
	const sectionSpaceAtLarge = METRICS.spaceSectionAtLarge ?? sectionSpace;
	const stripeSpace = METRICS.spaceStripe ?? sectionSpace;
	const stripeSpaceAtLarge = METRICS.spaceStripeAtLarge ?? stripeSpace;
	const stripeHorizontalGutter = METRICS.stripeHorizontalGutter ?? METRICS.space;
	const pageGutter = METRICS.pageGutter ?? METRICS.space;
	const pageGutterAtLarge = METRICS.pageGutterAtLarge ?? pageGutter;

	// `Flex section` is the separation scale of two peer Sections. It is not
	// derived from pageGutter: a wide desktop page edge should not create an
	// enormous gutter between two columns inside that page.
	const flexSectionGutter = METRICS.spaceFlexSection ?? sectionSpace * 2;
	const flexSectionGutterAtLarge =
		METRICS.spaceFlexSectionAtLarge ?? sectionSpaceAtLarge * 2;

	return {
		chunkSpace,
		chunkSpaceAtLarge,
		sectionSpace,
		sectionSpaceAtLarge,
		stripeSpace,
		stripeSpaceAtLarge,
		stripeHorizontalGutter,
		pageGutter,
		pageGutterAtLarge,
		flexSectionGutter,
		flexSectionGutterAtLarge,
	};
};

/**
 * Build the spacing-bearing portions of structural styles separately so their
 * compensating equations can be tested without rendering a platform.
 */
export const buildStructuralSpacingStyles = (METRICS, mediaQueries) => {
	const {
		chunkSpace,
		chunkSpaceAtLarge,
		sectionSpace,
		sectionSpaceAtLarge,
		stripeSpace,
		stripeSpaceAtLarge,
		stripeHorizontalGutter,
		pageGutter,
		pageGutterAtLarge,
		flexSectionGutter,
		flexSectionGutterAtLarge,
	} = resolveStructuralMetrics(METRICS);
	const { medium, large } = mediaQueries;

	return {
		stripe: {
			paddingVertical: stripeSpace,
			[medium]: {
				paddingLeft: stripeHorizontalGutter,
				paddingRight: stripeHorizontalGutter,
			},
			[large]: {
				paddingTop: stripeSpaceAtLarge,
				paddingBottom: stripeSpaceAtLarge,
			},
		},
		boundsContentSparse: {
			[large]: {
				paddingVertical: sectionSpaceAtLarge,
				paddingHorizontal: chunkSpaceAtLarge,
			},
		},
		section: {
			paddingTop: sectionSpace,
			marginHorizontal: pageGutter,
			paddingBottom: sectionSpace - chunkSpace,
			[large]: {
				paddingTop: sectionSpaceAtLarge,
				marginLeft: pageGutterAtLarge,
				marginRight: pageGutterAtLarge,
				paddingBottom: sectionSpaceAtLarge - chunkSpaceAtLarge,
			},
		},
		sectionBorder: {
			paddingTop: sectionSpace * 1.25,
			marginTop: sectionSpace * .25,
			[large]: {
				paddingTop: sectionSpaceAtLarge * 1.25,
				marginTop: sectionSpaceAtLarge * .25,
			},
		},
		sectionBorderedContent: {
			paddingTop: 0,
			marginTop: sectionSpace * .25,
			[large]: {
				marginTop: sectionSpaceAtLarge * .25,
			},
		},
		imageSnap: {
			marginHorizontal: 0,
			marginTop: -1 * chunkSpace,
			[medium]: {
				marginTop: chunkSpace / 2,
				marginHorizontal: chunkSpace,
			},
			[large]: {
				marginTop: chunkSpaceAtLarge / 2,
				marginHorizontal: chunkSpaceAtLarge,
			},
		},
		sectionless: {
			paddingTop: chunkSpace,
			paddingHorizontal: chunkSpace,
			[large]: {
				paddingTop: chunkSpaceAtLarge,
				paddingLeft: chunkSpaceAtLarge,
				paddingRight: chunkSpaceAtLarge,
			},
		},
		chunk: {
			paddingBottom: chunkSpace,
			[large]: {
				paddingBottom: chunkSpaceAtLarge,
			},
		},
		chunkBorder: {
			paddingTop: chunkSpace,
			[large]: {
				paddingTop: chunkSpaceAtLarge,
			},
		},
		flexSection: {
			marginLeft: -1 * flexSectionGutter,
			[large]: {
				marginLeft: -1 * flexSectionGutterAtLarge,
			},
		},
		flexItemSection: {
			paddingLeft: flexSectionGutter,
			[large]: {
				paddingLeft: flexSectionGutterAtLarge,
			},
		},
	};
};
