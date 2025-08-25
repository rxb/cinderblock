#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Find all JSX comment violations
function findJSXCommentViolations() {
  const files = fs.readdirSync('components')
    .filter(file => file.endsWith('.js'))
    .map(file => path.join('components', file));
  const violations = [];
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    
    let inJSXBlock = false;
    let braceDepth = 0;
    
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      const trimmed = line.trim();
      
      // Detect JSX blocks (inside return statements)
      if (line.match(/return\s*\(/)) {
        inJSXBlock = true;
        braceDepth = 0;
      }
      
      // Track brace depth to know when we exit JSX
      if (inJSXBlock) {
        const openBraces = (line.match(/\{/g) || []).length;
        const closeBraces = (line.match(/\}/g) || []).length;
        braceDepth += openBraces - closeBraces;
        
        // Check for // comments in JSX (but ignore JSDoc comments with *)
        if (line.match(/\/\/[^/]/) && 
            !line.match(/^\s*\/\//) &&  // Not a full-line comment
            !line.match(/^\s*\*/) &&    // Not a JSDoc line
            !line.match(/function|const|let|var|if|for|while|return|catch|try/) && // Not JS logic
            (line.match(/>\s*\/\/|}\s*\/\/|=.*\/\//) && !line.match(/=>\s*\/\//)) // Actually looks like JSX
        ) {
          violations.push({
            file,
            line: lineNumber,
            content: line.trim(),
            type: 'jsx-comment'
          });
        }
        
        // Exit JSX block detection
        if (line.match(/^\s*\);?\s*$/) || 
            (braceDepth < 0 && line.match(/\);?\s*$/))) {
          inJSXBlock = false;
        }
      }
      
      // Also check for malformed JSX comments like "*/}"
      if (line.match(/\*\/\s*\}/)) {
        violations.push({
          file,
          line: lineNumber,
          content: line.trim(),
          type: 'malformed-jsx-comment'
        });
      }
    });
  });
  
  return violations;
}

// Run the check
const violations = findJSXCommentViolations();

if (violations.length === 0) {
  console.log('✅ No JSX comment violations found!');
} else {
  console.log(`❌ Found ${violations.length} JSX comment violations:`);
  violations.forEach(v => {
    console.log(`  ${v.file}:${v.line} (${v.type})`);
    console.log(`    ${v.content}`);
  });
}