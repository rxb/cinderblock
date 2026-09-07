import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import mediaQuery from 'css-mediaquery';

// Capture the actual buildStyles definitions without requiring JSX/DOM setup.
// Assertions exercise compositional geometry and the existing query behavior.
const constantsSource = readFileSync(
	new URL('../styles/designConstants.js', import.meta.url), 'utf8'
).replace(/^import .*;\r?\n/gm, '').replace(/export const /g, 'const ');
const constants = runInNewContext(`${constantsSource}\n({
	METRICS, SWATCHES, FLEX_GROW_FACTORS, MEDIA_SIZES,
	MEDIA_QUERIES, MEDIA_QUERIES_SINGLE
})`, {Easing: {bezier: () => () => {}}});

const buildSource = readFileSync(
	new URL('../styles/buildStyles.js', import.meta.url), 'utf8'
).replace(/^import .*;\r?\n/gm, '').replace('export default buildStyles;', 'buildStyles;');
const buildStyles = runInNewContext(buildSource, {
	...constants,
	StyleSheet: {create: styles => styles},
	MediaQueryStyleSheet: {create: styles => ({styles, ids: {}})},
});

const atWidth = (definition, width) => {
	const result = Object.fromEntries(
		Object.entries(definition).filter(([key]) => !key.startsWith('@media'))
	);
	for (const [query, values] of Object.entries(definition)) {
		if (query.startsWith('@media') && mediaQuery.match(query.slice(6), {
			type: 'screen', width, height: 900,
		})) Object.assign(result, values);
	}
	return result;
};

for (const overrides of [{}, {space: 16, spaceSection: 32}, {space: 24, spaceSection: 36}]) {
	const metrics = {...constants.METRICS, ...overrides};
	const {styles} = buildStyles(metrics, constants.SWATCHES);
	for (const width of [375, 479, 480, 839, 840, 1024, 1440]) {
		const resolved = name => atWidth(styles[name], width);
		const section = resolved('section');
		const chunk = resolved('chunk');
		assert.equal(section.paddingTop, metrics.spaceSection);
		assert.equal(chunk.paddingBottom, metrics.space);
		assert.equal(section.paddingBottom + chunk.paddingBottom, section.paddingTop);
		assert.equal(section.marginHorizontal, metrics.space);
		assert.equal(resolved('stripe').paddingVertical, metrics.spaceSection);
		assert.equal(resolved('sectionless').paddingTop, chunk.paddingBottom);
		assert.equal(resolved('sectionless').paddingHorizontal, metrics.space);
		assert.equal(resolved('flex--section').marginLeft + resolved('flex-item--section').paddingLeft, 0);
		assert.equal(resolved('flex-item--section').paddingLeft, metrics.space * 2);
		assert.equal(resolved('list--grid').marginLeft + resolved('list-item--grid').paddingLeft, 0);
		assert.equal(resolved('list--scroll').paddingBottom + resolved('list--scroll').marginBottom, 0);
		assert.equal(resolved('imageSnap').marginTop, width < 480 ? -metrics.space : metrics.space / 2);
		assert.equal(resolved('imageSnap').marginHorizontal, width < 480 ? 0 : metrics.space);
		// Existing heading and explicit layout breakpoints still work.
		assert.equal(resolved('textPageHead').fontSize,
			width < 840 ? metrics.pageHeadSize : metrics.pageHeadAtLargeSize);
		assert.equal(resolved('textSectionHead').fontSize,
			width < 840 ? metrics.sectionHeadSize : metrics.sectionHeadAtLargeSize);
		assert.equal(resolved('flex--row__large').flexDirection, width < 840 ? undefined : 'row');
	}
}

console.log('Baseline spacing equations and viewport breakpoints passed (3 themes, 7 widths).');
