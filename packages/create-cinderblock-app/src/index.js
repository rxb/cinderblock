const fs = require('fs-extra');
const path = require('path');
const { program } = require('commander');
const prompts = require('prompts');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const validateProjectName = require('validate-npm-package-name');

const packageJson = require('../package.json');

async function createCinderblockApp(args) {
  let projectName;
  let template = 'nextjs-default';
  let packageManager = 'npm';

  // Parse command line arguments
  program
    .name('create-cinderblock-app')
    .description('Create a new Cinderblock app')
    .version(packageJson.version)
    .argument('[project-name]', 'name of the project')
    .option('-t, --template <template>', 'project template', 'nextjs-default')
    .option('--use-npm', 'use npm')
    .option('--use-yarn', 'use yarn')
    .option('--use-pnpm', 'use pnpm')
    .parse(['node', 'create-cinderblock-app', ...args]);

  const options = program.opts();
  projectName = program.args[0];

  // Determine package manager
  if (options.useYarn) packageManager = 'yarn';
  if (options.usePnpm) packageManager = 'pnpm';
  if (options.useNpm) packageManager = 'npm';
  
  // Get template from options
  if (options.template) template = options.template;

  console.log(chalk.blue.bold('🧱 Create Cinderblock App'))
  console.log();

  // Interactive prompts if no project name provided
  if (!projectName) {
    const response = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: 'What is your project named?',
        initial: 'my-cinderblock-app',
        validate: (value) => {
          const validation = validateProjectName(value);
          if (!validation.validForNewPackages) {
            return validation.errors?.[0] || validation.warnings?.[0] || 'Invalid project name';
          }
          return true;
        }
      }
    ]);

    if (!response.projectName) {
      console.log(chalk.red('Operation cancelled.'));
      process.exit(1);
    }

    projectName = response.projectName;
  }

  // Additional prompts (only if not provided via command line)
  const promptQuestions = [];
  
  // Only prompt for template if not provided
  if (!options.template) {
    promptQuestions.push(
      {
        type: 'select',
        name: 'framework',
        message: 'Which framework would you like to use?',
        choices: [
          { title: 'Next.js', value: 'nextjs', description: 'React framework for production' },
          { title: 'Expo', value: 'expo', description: 'React Native for mobile (coming soon)', disabled: true },
          { title: 'Jekyll', value: 'jekyll', description: 'Static site generator (coming soon)', disabled: true }
        ],
        initial: 0
      },
      {
        type: 'select',
        name: 'templateType',
        message: 'Which template would you like to use?',
        choices: [
          { title: 'Default (Minimal)', value: 'default', description: 'Clean starting point for new projects' },
          { title: 'Kitchensink (Full Demo)', value: 'kitchensink', description: 'Comprehensive showcase of all components' },
          { title: 'Blog', value: 'blog', description: 'Blog template with MDX and authentication' }
        ],
        initial: 0
      }
    );
  }
  
  // Only prompt for package manager if not provided and is npm (default)
  if (packageManager === 'npm' && !options.useNpm && !options.useYarn && !options.usePnpm) {
    promptQuestions.push({
      type: 'select',
      name: 'packageManager',
      message: 'Which package manager would you like to use?',
      choices: [
        { title: 'npm', value: 'npm' },
        { title: 'yarn', value: 'yarn' },
        { title: 'pnpm', value: 'pnpm' }
      ],
      initial: 0
    });
  }
  
  const responses = await prompts(promptQuestions);

  if (responses.framework && responses.templateType) {
    template = `${responses.framework}-${responses.templateType}`;
  } else if (responses.template) {
    template = responses.template;
  }
  if (responses.packageManager) packageManager = responses.packageManager;

  const projectPath = path.resolve(process.cwd(), projectName);

  // Check if directory already exists
  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`Directory ${projectName} already exists!`));
    process.exit(1);
  }

  console.log();
  console.log(chalk.green(`Creating ${projectName}...`));
  console.log();

  try {
    // Create project directory
    fs.ensureDirSync(projectPath);

    // Copy template
    const templatePath = path.join(__dirname, '..', 'templates', template);
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template "${template}" not found`);
    }

    await copyTemplate(templatePath, projectPath, { PROJECT_NAME: projectName });

    console.log(chalk.green('✓ Project files created'));

    // Initialize git
    console.log(chalk.blue('Initializing git repository...'));
    const gitInit = spawn.sync('git', ['init'], { 
      cwd: projectPath, 
      stdio: 'pipe' 
    });

    if (gitInit.status === 0) {
      console.log(chalk.green('✓ Git repository initialized'));
    } else {
      console.log(chalk.yellow('⚠ Git repository initialization failed'));
    }

    // Install dependencies
    console.log(chalk.blue(`Installing dependencies with ${packageManager}...`));
    const installCommand = packageManager === 'yarn' ? 'yarn' : packageManager;
    const installArgs = packageManager === 'yarn' ? ['install'] : ['install'];

    const install = spawn.sync(installCommand, installArgs, {
      cwd: projectPath,
      stdio: 'inherit'
    });

    if (install.status === 0) {
      console.log(chalk.green('✓ Dependencies installed'));
    } else {
      console.log(chalk.yellow('⚠ Dependency installation failed'));
      console.log(chalk.yellow(`You can manually install dependencies by running:`));
      console.log(chalk.cyan(`  cd ${projectName}`));
      console.log(chalk.cyan(`  ${packageManager} install`));
    }

    // Success message
    console.log();
    console.log(chalk.green.bold('🎉 Success! Created') + chalk.cyan.bold(` ${projectName} `));
    console.log();
    console.log('Inside that directory, you can run several commands:');
    console.log();
    console.log(chalk.cyan(`  ${packageManager} run dev`));
    console.log('    Starts the development server.');
    console.log();
    console.log(chalk.cyan(`  ${packageManager} run build`));
    console.log('    Builds the app for production.');
    console.log();
    console.log(chalk.cyan(`  ${packageManager} start`));
    console.log('    Runs the built app in production mode.');
    console.log();
    console.log('We suggest that you begin by typing:');
    console.log();
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan(`  ${packageManager} run dev`));
    console.log();
    console.log('Happy coding! 🚀');
    console.log();
    console.log('Learn more about Cinderblock Design System:');
    console.log(chalk.blue('https://github.com/rxb/cinderblock'));

  } catch (error) {
    console.error(chalk.red('Error creating project:'), error.message);
    
    // Clean up on error
    if (fs.existsSync(projectPath)) {
      fs.removeSync(projectPath);
    }
    
    process.exit(1);
  }
}

async function copyTemplate(templatePath, projectPath, replacements = {}) {
  const files = await fs.readdir(templatePath);

  for (const file of files) {
    const srcPath = path.join(templatePath, file);
    const destPath = path.join(projectPath, file);
    const stat = await fs.stat(srcPath);

    if (stat.isDirectory()) {
      await fs.ensureDir(destPath);
      await copyTemplate(srcPath, destPath, replacements);
    } else {
      let content = await fs.readFile(srcPath, 'utf8');
      
      // Replace template variables
      for (const [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        content = content.replace(regex, value);
      }

      await fs.writeFile(destPath, content);
    }
  }
}

module.exports = { createCinderblockApp };