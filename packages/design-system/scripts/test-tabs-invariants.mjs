import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const tabsSource = readFileSync(
	new URL('../components/Tabs.js', import.meta.url),
	'utf8'
);

assert.match(tabsSource, /type="button"/);
assert.match(tabsSource, /role: 'tab'/);
assert.match(tabsSource, /case 'ArrowRight':/);
assert.match(tabsSource, /case 'ArrowLeft':/);
assert.doesNotMatch(tabsSource, /case 'ArrowDown':/);
assert.doesNotMatch(tabsSource, /case 'ArrowUp':/);
assert.doesNotMatch(tabsSource, /borderWidth:\s*0/);
assert.match(tabsSource, /StyleSheet\.flatten\(\[/);

console.log('Tab interaction and styling invariants passed.');
