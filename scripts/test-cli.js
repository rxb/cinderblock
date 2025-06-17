#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');
const chalk = require('chalk');

const TEST_DIR = path.join(__dirname, '..', 'test-output');
const CLI_PATH = path.join(__dirname, '..', 'packages/create-cinderblock-app/bin/create-cinderblock-app.js');

async function testCLI() {
  console.log(chalk.blue.bold('🧪 Testing Create Cinderblock App CLI'));
  console.log();

  // Clean up any previous test
  if (fs.existsSync(TEST_DIR)) {
    console.log('🧹 Cleaning up previous test...');
    await fs.remove(TEST_DIR);
  }

  await fs.ensureDir(TEST_DIR);
  process.chdir(TEST_DIR);

  console.log('📁 Test directory:', TEST_DIR);
  console.log();

  // Test CLI with default template
  console.log(chalk.blue('Testing CLI with default template...'));
  
  const testArgs = [
    'test-project',
    '--template', 'default',
    '--use-npm'
  ];

  return new Promise((resolve, reject) => {
    const child = spawn('node', [CLI_PATH, ...testArgs], {
      stdio: 'inherit',
      cwd: TEST_DIR
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log();
        console.log(chalk.green.bold('✅ CLI test completed successfully!'));
        console.log();
        console.log('Generated project structure:');
        
        // List the generated files
        const projectPath = path.join(TEST_DIR, 'test-project');
        if (fs.existsSync(projectPath)) {
          const files = fs.readdirSync(projectPath);
          files.forEach(file => {
            console.log(chalk.cyan(`  ${file}`));
          });
        }
        
        console.log();
        console.log(chalk.yellow('To test the generated project:'));
        console.log(chalk.cyan(`  cd ${projectPath}`));
        console.log(chalk.cyan('  npm run dev'));
        
        resolve();
      } else {
        reject(new Error(`CLI exited with code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

if (require.main === module) {
  testCLI().catch(error => {
    console.error(chalk.red('Test failed:'), error.message);
    process.exit(1);
  });
}

module.exports = { testCLI };