#!/usr/bin/env node

/**
 * Test script for create-cinderblock-app local development
 * Creates a test project in a temp directory to verify everything works
 */

const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');
const os = require('os');

async function testCLI() {
  console.log('🧪 Testing create-cinderblock-app locally...\n');

  // Create a temporary directory for testing
  const tempDir = path.join(os.tmpdir(), 'cinderblock-test-' + Date.now());
  const projectName = 'test-app';
  const projectPath = path.join(tempDir, projectName);

  try {
    // Ensure temp directory exists
    await fs.ensureDir(tempDir);
    
    console.log(`📁 Testing in: ${tempDir}`);
    console.log(`🏗️  Creating project: ${projectName}\n`);

    // Run create-cinderblock-app
    const child = spawn('create-cinderblock-app', [projectName, '--use-npm'], {
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

    console.log(`\n🧹 Cleaning up test directory...`);
    await fs.remove(tempDir);
    
    console.log('✨ Test completed successfully!\n');
    
    console.log('📖 Usage instructions:');
    console.log('  create-cinderblock-app my-app');
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