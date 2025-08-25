#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Template mappings
const TEMPLATE_MAPPINGS = {
  'starter-nextjs-default': 'nextjs-default',
  'starter-nextjs-blog': 'nextjs-blog', 
  'starter-nextjs-kitchensink': 'nextjs-kitchensink'
};

// Files to ignore during sync
const IGNORE_FILES = [
  '.DS_Store',
  '.gitignore',
  'node_modules',
  'package-lock.json',
  '.next'
];

// Files that need special handling
const SPECIAL_FILES = {
  'package.json': handlePackageJson,
  'README.md': handleReadme
};

function main() {
  console.log('🔄 Syncing templates from starter packages...\n');
  
  const packagesDir = path.resolve(__dirname, '..');
  
  for (const [starterName, templateName] of Object.entries(TEMPLATE_MAPPINGS)) {
    console.log(`Syncing ${starterName} → ${templateName}`);
    
    const starterPath = path.join(packagesDir, starterName);
    const templatePath = path.join(__dirname, 'templates', templateName);
    
    if (!fs.existsSync(starterPath)) {
      console.log(`⚠️  Warning: ${starterPath} does not exist, skipping`);
      continue;
    }
    
    syncDirectory(starterPath, templatePath);
    console.log(`✅ Synced ${templateName}\n`);
  }
  
  console.log('🎉 Template sync completed!');
}

function syncDirectory(sourcePath, targetPath, relativePath = '') {
  const sourceItems = fs.readdirSync(sourcePath);
  
  // Ensure target directory exists
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }
  
  for (const item of sourceItems) {
    if (IGNORE_FILES.includes(item)) {
      continue;
    }
    
    const sourceItemPath = path.join(sourcePath, item);
    const targetItemPath = path.join(targetPath, item);
    const itemRelativePath = path.join(relativePath, item);
    
    const stat = fs.statSync(sourceItemPath);
    
    if (stat.isDirectory()) {
      syncDirectory(sourceItemPath, targetItemPath, itemRelativePath);
    } else {
      syncFile(sourceItemPath, targetItemPath, itemRelativePath);
    }
  }
  
  // Remove files from template that don't exist in starter
  if (fs.existsSync(targetPath)) {
    const targetItems = fs.readdirSync(targetPath);
    for (const item of targetItems) {
      const sourceItemPath = path.join(sourcePath, item);
      const targetItemPath = path.join(targetPath, item);
      
      if (!fs.existsSync(sourceItemPath) && !IGNORE_FILES.includes(item)) {
        console.log(`  🗑️  Removing ${item} (not in starter)`);
        if (fs.statSync(targetItemPath).isDirectory()) {
          fs.rmSync(targetItemPath, { recursive: true });
        } else {
          fs.unlinkSync(targetItemPath);
        }
      }
    }
  }
}

function syncFile(sourcePath, targetPath, relativePath) {
  const filename = path.basename(sourcePath);
  
  if (SPECIAL_FILES[filename]) {
    SPECIAL_FILES[filename](sourcePath, targetPath, relativePath);
  } else {
    // Regular file copy
    const sourceContent = fs.readFileSync(sourcePath);
    const targetExists = fs.existsSync(targetPath);
    
    if (!targetExists || !fs.readFileSync(targetPath).equals(sourceContent)) {
      console.log(`  📝 ${relativePath}`);
      fs.writeFileSync(targetPath, sourceContent);
    }
  }
}

function handlePackageJson(sourcePath, targetPath, relativePath) {
  const sourcePackage = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  let targetPackage = {};
  
  if (fs.existsSync(targetPath)) {
    targetPackage = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  }
  
  // Preserve template placeholder for name
  const syncedPackage = {
    ...sourcePackage,
    name: '{{PROJECT_NAME}}'
  };
  
  // Change workspace dependency to published version
  if (syncedPackage.dependencies && syncedPackage.dependencies['@cinderblock/design-system']) {
    if (syncedPackage.dependencies['@cinderblock/design-system'].includes('workspace:')) {
      syncedPackage.dependencies['@cinderblock/design-system'] = '^0.0.1';
    }
  }
  
  const syncedContent = JSON.stringify(syncedPackage, null, 2) + '\n';
  const targetContent = fs.existsSync(targetPath) ? fs.readFileSync(targetPath, 'utf8') : '';
  
  if (syncedContent !== targetContent) {
    console.log(`  📦 ${relativePath} (with template placeholders)`);
    fs.writeFileSync(targetPath, syncedContent);
  }
}

function handleReadme(sourcePath, targetPath, relativePath) {
  // For now, just copy README files
  // In the future, might want special template-specific README handling
  const sourceContent = fs.readFileSync(sourcePath, 'utf8');
  const targetExists = fs.existsSync(targetPath);
  
  if (!targetExists || fs.readFileSync(targetPath, 'utf8') !== sourceContent) {
    console.log(`  📖 ${relativePath}`);
    fs.writeFileSync(targetPath, sourceContent);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };