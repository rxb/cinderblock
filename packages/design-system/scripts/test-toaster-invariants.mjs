import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const toasterSource = readFileSync(
	new URL('../components/Toaster.js', import.meta.url),
	'utf8'
);

assert.match(toasterSource, /accessibilityRole="status"/);
assert.match(toasterSource, /accessibilityLiveRegion="polite"/);
assert.match(toasterSource, /accessibilityLabel=/);
assert.match(toasterSource, /Dismiss notification/);
assert.match(toasterSource, /minWidth:\s*44/);
assert.match(toasterSource, /minHeight:\s*44/);
assert.match(toasterSource, /prefers-reduced-motion/);
assert.match(toasterSource, /componentWillUnmount\(\)/);
assert.match(toasterSource, /onMouseEnter=\{this\.pauseAutoHide\}/);
assert.match(toasterSource, /onFocus=\{this\.pauseAutoHide\}/);

console.log('Toast accessibility and lifecycle invariants passed.');
