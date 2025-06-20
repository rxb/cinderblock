#!/usr/bin/env node

/**
 * Non-interactive test for create-cinderblock-app
 * Tests the CLI with command-line arguments only
 */

const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');
const os = require('os');

async function testCLI() {
  console.log('🧪 Testing create-cinderblock-app non-interactively...\n');

  // Create a temporary directory for testing
  const tempDir = path.join(os.tmpdir(), 'cinderblock-test-' + Date.now());
  const projectName = 'test-minimal-app';
  const projectPath = path.join(tempDir, projectName);

  try {
    // Ensure temp directory exists
    await fs.ensureDir(tempDir);
    
    console.log(`📁 Testing in: ${tempDir}`);
    console.log(`🏗️  Creating project: ${projectName}\n`);

    // Run create-cinderblock-app with command line arguments (non-interactive)
    const child = spawn('create-cinderblock-app', [
      projectName, 
      '--template', 'default',
      '--use-npm'
    ], {
      cwd: tempDir,
      stdio: 'inherit'
    });

    await new Promise((resolve, reject) => {
      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`CLI exited with code ${code}`));
        }
      });
      
      child.on('error', reject);
    });

    // Verify the project was created
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (!await fs.pathExists(packageJsonPath)) {
      throw new Error('package.json was not created');
    }

    const packageJson = await fs.readJson(packageJsonPath);
    console.log(`\n✅ Project created successfully!`);
    console.log(`📦 Project name: ${packageJson.name}`);
    console.log(`🎯 Dependencies include: ${Object.keys(packageJson.dependencies).slice(0, 3).join(', ')}...`);

    // Check if design system is included
    if (packageJson.dependencies['@cinderblock/design-system']) {
      console.log(`🎨 Design system version: ${packageJson.dependencies['@cinderblock/design-system']}`);
    }

    // Check if essential files exist
    const essentialFiles = [
      'pages/index.js',
      'pages/about.js',
      'pages/_app.js',
      'next.config.js'
    ];

    for (const file of essentialFiles) {
      const filePath = path.join(projectPath, file);
      if (await fs.pathExists(filePath)) {
        console.log(`✅ ${file} exists`);
      } else {
        console.log(`❌ ${file} missing`);
      }
    }

    console.log(`\n🧹 Cleaning up test directory...`);
    await fs.remove(tempDir);
    
    console.log('✨ Test completed successfully!\n');
    
    console.log('📖 Usage instructions:');
    console.log('  create-cinderblock-app my-app --template default');
    console.log('  create-cinderblock-app my-app --template kitchensink');
    console.log('  cd my-app');
    console.log('  npm run dev');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    // Clean up on error
    try {
      await fs.remove(tempDir);
    } catch (cleanupError) {
      console.error('Failed to clean up:', cleanupError.message);
    }
    
    process.exit(1);
  }
}

testCLI().catch(console.error);