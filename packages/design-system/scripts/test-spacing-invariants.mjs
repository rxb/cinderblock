import assert from 'node:assert/strict';
import {
	buildStructuralSpacingStyles,
	resolveStructuralMetrics,
} from '../styles/structuralSpacing.js';

const medium = '@medium';
const large = '@large';
const queries = { medium, large };

const visibleSectionBottom = (styles, breakpoint) => {
	const section = breakpoint ? styles.section[breakpoint] : styles.section;
	const chunk = breakpoint ? styles.chunk[breakpoint] : styles.chunk;
	return section.paddingBottom + chunk.paddingBottom;
};

const legacyMetrics = {
	space: 20,
	spaceSection: 20,
};
const legacy = buildStructuralSpacingStyles(legacyMetrics, queries);

assert.equal(visibleSectionBottom(legacy), legacy.section.paddingTop);
assert.equal(
	visibleSectionBottom(legacy, large),
	legacy.section[large].paddingTop
);
assert.equal(legacy.flexSection.marginLeft, -40);
assert.equal(legacy.flexItemSection.paddingLeft, 40);
assert.equal(
	legacy.flexSection[large].marginLeft
		+ legacy.flexItemSection[large].paddingLeft,
	0
);

const experimentalMetrics = {
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
};
const experimental = buildStructuralSpacingStyles(experimentalMetrics, queries);
const resolved = resolveStructuralMetrics(experimentalMetrics);

assert.equal(visibleSectionBottom(experimental), 16);
assert.equal(visibleSectionBottom(experimental, large), 24);
assert.equal(
	visibleSectionBottom(experimental) + experimental.section.paddingTop,
	32
);
assert.equal(
	visibleSectionBottom(experimental, large)
		+ experimental.section[large].paddingTop,
	48
);
assert.equal(
	experimental.stripe.paddingVertical + experimental.section.paddingTop,
	40
);
assert.equal(
	experimental.stripe[large].paddingTop
		+ experimental.section[large].paddingTop,
	56
);
assert.equal(
	2 * (
		experimental.stripe.paddingVertical
			+ experimental.section.paddingTop
	),
	80
);
assert.equal(
	2 * (
		experimental.stripe[large].paddingTop
			+ experimental.section[large].paddingTop
	),
	112
);
assert.ok(
	2 * (
		experimental.stripe.paddingVertical
			+ experimental.section.paddingTop
	)
	> visibleSectionBottom(experimental)
		+ experimental.section.paddingTop
);
assert.ok(
	2 * (
		experimental.stripe[large].paddingTop
			+ experimental.section[large].paddingTop
	)
	> visibleSectionBottom(experimental, large)
		+ experimental.section[large].paddingTop
);
assert.equal(
	experimental.sectionless.paddingTop,
	experimental.chunk.paddingBottom
);
assert.equal(
	experimental.sectionless[large].paddingTop,
	experimental.chunk[large].paddingBottom
);
assert.equal(experimental.boundsContentSparse[large].paddingVertical, 24);
assert.equal(experimental.boundsContentSparse[large].paddingHorizontal, 20);
assert.equal(experimental.imageSnap.marginTop, -16);
assert.equal(experimental.imageSnap[medium].marginTop, 8);
assert.equal(experimental.imageSnap[large].marginTop, 10);
assert.equal(experimental.imageSnap[large].marginHorizontal, 20);
assert.equal(
	experimental.flexSection.marginLeft
		+ experimental.flexItemSection.paddingLeft,
	0
);
assert.equal(
	experimental.flexSection[large].marginLeft
		+ experimental.flexItemSection[large].paddingLeft,
	0
);
assert.equal(resolved.flexSectionGutter, 32);
assert.equal(resolved.flexSectionGutterAtLarge, 48);

console.log('Structural spacing invariants passed.');
