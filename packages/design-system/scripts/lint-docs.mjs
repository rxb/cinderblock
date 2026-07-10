#!/usr/bin/env node
// Lint doc code blocks against the real library.
// Checks:
//  1. Imports from '@cinderblock/design-system' only name real exports (index.js).
//  2. No <Bounds> nested inside <Section> (canon: Stripe > Bounds > Section).
// Usage: node scripts/lint-docs.mjs
import { readFileSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = join(root, 'docs');

// Collect exports from index.js
const indexSrc = readFileSync(join(root, 'index.js'), 'utf8');
const exportBlock = indexSrc.match(/export\s*\{([\s\S]*?)\}/);
const exportNames = new Set(
  exportBlock[1].split(',').map(s => s.trim()).filter(Boolean)
);

let problems = 0;
const report = (file, line, msg) => {
  problems++;
  console.log(`${file}:${line}  ${msg}`);
};

for (const fname of readdirSync(docsDir).filter(f => f.endsWith('.md'))) {
  const src = readFileSync(join(docsDir, fname), 'utf8');
  const lines = src.split('\n');

  // Walk fenced code blocks
  let inCode = false, blockStart = 0, block = [];
  const blocks = [];
  lines.forEach((line, i) => {
    if (/^```/.test(line)) {
      if (inCode) { blocks.push({ start: blockStart, code: block.join('\n') }); block = []; }
      else blockStart = i + 2;
      inCode = !inCode;
      return;
    }
    if (inCode) block.push(line);
  });

  for (const { start, code } of blocks) {
    // 1. import checks
    const importRe = /import\s*\{([^}]*)\}\s*from\s*['"]@cinderblock\/design-system['"]/g;
    let m;
    while ((m = importRe.exec(code))) {
      for (const raw of m[1].split(',')) {
        const name = raw.trim().split(/\s+as\s+/)[0].trim();
        if (name && !exportNames.has(name)) {
          report(fname, start, `imports '${name}' which is not exported from index.js`);
        }
      }
    }

    // 2. Bounds-inside-Section nesting
    const tagRe = /<\/?(Section|Bounds)\b[^>]*?(\/)?>/g;
    const stack = [];
    let t;
    while ((t = tagRe.exec(code))) {
      const [full, tag, selfClose] = t;
      const lineNo = start + code.slice(0, t.index).split('\n').length - 1;
      if (full.startsWith('</')) {
        if (stack[stack.length - 1] === tag) stack.pop();
      } else if (!selfClose) {
        if (tag === 'Bounds' && stack.includes('Section')) {
          report(fname, lineNo, '<Bounds> nested inside <Section> — canon is Stripe > Bounds > Section');
        }
        stack.push(tag);
      }
    }
  }
}

if (problems) {
  console.log(`\n${problems} problem(s) found.`);
  process.exit(1);
} else {
  console.log('docs lint: OK');
}
