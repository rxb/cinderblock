#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const MONOREPO_ROOT = path.resolve(__dirname, '..');
const STARTER_NEXTJS_DEFAULT_PATH = path.join(MONOREPO_ROOT, 'packages/starter-nextjs-default');
const STARTER_NEXTJS_KITCHENSINK_PATH = path.join(MONOREPO_ROOT, 'packages/starter-nextjs-kitchensink');
const STARTER_NEXTJS_BLOG_PATH = path.join(MONOREPO_ROOT, 'packages/starter-nextjs-blog');
const TEMPLATES_PATH = path.join(MONOREPO_ROOT, 'packages/create-cinderblock-app/templates');
const DESIGN_SYSTEM_VERSION = '0.0.1'; // TODO: Read from design-system package.json

// Template configurations
const TEMPLATE_CONFIGS = {
  'nextjs-default': {
    source: STARTER_NEXTJS_DEFAULT_PATH,
    destination: path.join(TEMPLATES_PATH, 'nextjs-default'),
    enabled: true,
    transformations: {
      // Replace workspace dependency with published version
      packageJson: (content) => {
        return content
          .replace('"@cinderblock/design-system": "workspace:*"', `"@cinderblock/design-system": "^${DESIGN_SYSTEM_VERSION}"`)
          .replace('"name": "starter-nextjs-default"', '"name": "{{PROJECT_NAME}}"');
      },
      // Update README for template usage
      readme: (content) => {
        return `# {{PROJECT_NAME}}

A Next.js application built with the [Cinderblock Design System](https://github.com/rxb/cinderblock).

## Getting Started

First, install dependencies:

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About Cinderblock Design System

This project uses the Cinderblock Design System, which emphasizes structural hierarchy and responsive design. Learn more about the key concepts:

### Structural Hierarchy

Cinderblock uses a unique approach where spacing and layout come from structural components:

\`\`\`jsx
<Stripe>       {/* Full-width sections */}
  <Section>    {/* Content areas */}
    <Chunk>    {/* Element spacing */}
      <Text type="pageHead">Your Content</Text>
    </Chunk>
    <Chunk>
      <Text>More content with proper spacing</Text>
    </Chunk>
  </Section>
</Stripe>
\`\`\`

### Key Components

- **Structural**: \`Stripe\`, \`Section\`, \`Chunk\`, \`Flex\`, \`FlexItem\`
- **UI**: \`Button\`, \`TextInput\`, \`Modal\`, \`Tabs\`
- **Content**: \`Text\`, \`Avatar\`, \`Icon\`, \`Picture\`, \`List\`
- **Utility**: \`LoadingBlock\`, \`RevealBlock\`, \`Bounce\`

### Example Usage

\`\`\`jsx
import { 
  Stripe, 
  Section, 
  Chunk, 
  Text, 
  Button 
} from '@cinderblock/design-system';

function HomePage() {
  return (
    <Stripe>
      <Section>
        <Chunk>
          <Text type="pageHead">Welcome to {{PROJECT_NAME}}</Text>
        </Chunk>
        <Chunk>
          <Text>Start building your app with Cinderblock components.</Text>
        </Chunk>
        <Chunk>
          <Button color="primary">Get Started</Button>
        </Chunk>
      </Section>
    </Stripe>
  );
}
\`\`\`

## Learn More

- [Cinderblock Documentation](https://github.com/rxb/cinderblock/tree/main/packages/design-system/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Design System Components](https://github.com/rxb/cinderblock/tree/main/packages/design-system/docs)

## Project Structure

\`\`\`
{{PROJECT_NAME}}/
├── pages/           # Next.js pages
├── components/      # Your custom components
├── public/          # Static assets
├── styles/          # Global styles
└── package.json
\`\`\`

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

This project was created with \`create-cinderblock-app\`. To learn more about the Cinderblock Design System, visit the [main repository](https://github.com/rxb/cinderblock).`;
      }
    },
    excludePatterns: [
      'node_modules',
      '.next',
      '.git',
      'package-lock.json',
      '.DS_Store'
    ]
  },
  
  'nextjs-kitchensink': {
    source: STARTER_NEXTJS_KITCHENSINK_PATH,
    destination: path.join(TEMPLATES_PATH, 'nextjs-kitchensink'),
    enabled: true,
    transformations: {
      // Replace workspace dependency with published version
      packageJson: (content) => {
        return content
          .replace('"@cinderblock/design-system": "workspace:*"', `"@cinderblock/design-system": "^${DESIGN_SYSTEM_VERSION}"`)
          .replace('"name": "starter-nextjs-kitchensink"', '"name": "{{PROJECT_NAME}}"');
      },
      // Update README for template usage
      readme: (content) => {
        return `# {{PROJECT_NAME}}

A Next.js application built with the [Cinderblock Design System](https://github.com/rxb/cinderblock) featuring a comprehensive showcase of all components.

## Getting Started

First, install dependencies:

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About This Template

This template showcases the full capabilities of the Cinderblock Design System with:

- **Complete component showcase**: Examples of all available components
- **Advanced patterns**: Complex layouts and interactions
- **State management**: Redux integration for app state
- **Content management**: MDX support for blog-style content
- **Responsive design**: Mobile-first responsive layouts

## Learn More

- [Cinderblock Documentation](https://github.com/rxb/cinderblock/tree/main/packages/design-system/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Design System Components](https://github.com/rxb/cinderblock/tree/main/packages/design-system/docs)`;
      }
    },
    excludePatterns: [
      'node_modules',
      '.next',
      '.git',
      'package-lock.json',
      '.DS_Store'
    ]
  },
  
  'nextjs-blog': {
    source: STARTER_NEXTJS_BLOG_PATH,
    destination: path.join(TEMPLATES_PATH, 'nextjs-blog'),
    enabled: true,
    transformations: {
      // Replace workspace dependency with published version
      packageJson: (content) => {
        return content
          .replace('"cinderblock": "file:~/Repos/cinderblock"', `"@cinderblock/design-system": "^${DESIGN_SYSTEM_VERSION}"`)
          .replace('"name": "rgb.work"', '"name": "{{PROJECT_NAME}}"');
      },
      // Update README for template usage
      readme: (content) => {
        return `# {{PROJECT_NAME}}

A Next.js blog application built with the [Cinderblock Design System](https://github.com/rxb/cinderblock) featuring MDX support and content management.

## Getting Started

First, install dependencies:

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About This Template

This template showcases a full-featured blog with:

- **MDX Support**: Write blog posts in Markdown with React components
- **Content Management**: File-based content management system
- **Rich Components**: Full showcase of design system components
- **Authentication**: User login and registration flows
- **State Management**: Redux integration for complex app state
- **Responsive Design**: Mobile-first responsive layouts

## Learn More

- [Cinderblock Documentation](https://github.com/rxb/cinderblock/tree/main/packages/design-system/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)`;
      }
    },
    excludePatterns: [
      'node_modules',
      '.next',
      '.git',
      'package-lock.json',
      '.DS_Store'
    ]
  },
  
  dashboard: {
    source: null, // No source yet
    destination: path.join(TEMPLATES_PATH, 'dashboard'),
    enabled: false,
    placeholderOnly: true
  },
  
  ecommerce: {
    source: null, // No source yet
    destination: path.join(TEMPLATES_PATH, 'ecommerce'),
    enabled: false,
    placeholderOnly: true
  }
};

async function syncTemplate(templateName, config) {
  console.log(chalk.blue(`📋 Syncing ${templateName} template...`));
  
  if (!config.enabled || config.placeholderOnly) {
    console.log(chalk.yellow(`⏭️  Skipping ${templateName} (${config.placeholderOnly ? 'placeholder only' : 'disabled'})`));
    return;
  }
  
  if (!config.source || !fs.existsSync(config.source)) {
    console.log(chalk.red(`❌ Source path not found: ${config.source}`));
    return;
  }
  
  try {
    // Clean destination
    if (fs.existsSync(config.destination)) {
      console.log(`   🧹 Cleaning ${config.destination}`);
      await fs.remove(config.destination);
    }
    
    // Create destination directory
    await fs.ensureDir(config.destination);
    
    // Copy source to destination
    console.log(`   📁 Copying from ${config.source}`);
    await copyWithExclusions(config.source, config.destination, config.excludePatterns || []);
    
    // Apply transformations
    if (config.transformations) {
      console.log(`   🔄 Applying transformations`);
      await applyTransformations(config.destination, config.transformations);
    }
    
    console.log(chalk.green(`✅ ${templateName} template synced successfully`));
    
  } catch (error) {
    console.error(chalk.red(`❌ Error syncing ${templateName}:`), error.message);
  }
}

async function copyWithExclusions(src, dest, excludePatterns) {
  const items = await fs.readdir(src);
  
  for (const item of items) {
    // Check if item should be excluded
    if (excludePatterns.some(pattern => item.includes(pattern))) {
      continue;
    }
    
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = await fs.stat(srcPath);
    
    if (stat.isDirectory()) {
      await fs.ensureDir(destPath);
      await copyWithExclusions(srcPath, destPath, excludePatterns);
    } else {
      await fs.copy(srcPath, destPath);
    }
  }
}

async function applyTransformations(templatePath, transformations) {
  for (const [fileName, transformer] of Object.entries(transformations)) {
    let filePath;
    
    switch (fileName) {
      case 'packageJson':
        filePath = path.join(templatePath, 'package.json');
        break;
      case 'readme':
        filePath = path.join(templatePath, 'README.md');
        break;
      default:
        filePath = path.join(templatePath, fileName);
    }
    
    if (fs.existsSync(filePath)) {
      const content = await fs.readFile(filePath, 'utf8');
      const transformedContent = transformer(content);
      await fs.writeFile(filePath, transformedContent);
      console.log(`     ✏️  Transformed ${fileName}`);
    }
  }
}

async function getDesignSystemVersion() {
  try {
    const packageJsonPath = path.join(MONOREPO_ROOT, 'packages/design-system/package.json');
    const packageJson = await fs.readJson(packageJsonPath);
    return packageJson.version;
  } catch (error) {
    console.warn(chalk.yellow('Warning: Could not read design system version, using default'));
    return '0.0.1';
  }
}

async function main() {
  console.log(chalk.bold.blue('🔄 Syncing Create Cinderblock App Templates'));
  console.log();
  
  // Update design system version for all templates
  const version = await getDesignSystemVersion();
  
  // Update nextjs-default template
  TEMPLATE_CONFIGS['nextjs-default'].transformations.packageJson = (content) => {
    return content
      .replace('"@cinderblock/design-system": "workspace:*"', `"@cinderblock/design-system": "^${version}"`)
      .replace('"name": "starter-nextjs-default"', '"name": "{{PROJECT_NAME}}"');
  };
  
  // Update nextjs-kitchensink template
  TEMPLATE_CONFIGS['nextjs-kitchensink'].transformations.packageJson = (content) => {
    return content
      .replace('"@cinderblock/design-system": "workspace:*"', `"@cinderblock/design-system": "^${version}"`)
      .replace('"name": "starter-nextjs-kitchensink"', '"name": "{{PROJECT_NAME}}"');
  };
  
  // Update nextjs-blog template
  TEMPLATE_CONFIGS['nextjs-blog'].transformations.packageJson = (content) => {
    return content
      .replace('"cinderblock": "file:~/Repos/cinderblock"', `"@cinderblock/design-system": "^${version}"`)
      .replace('"name": "rgb.work"', '"name": "{{PROJECT_NAME}}"');
  };
  
  console.log(chalk.blue(`📦 Using design system version: ${version}`));
  console.log();
  
  // Sync each template
  for (const [templateName, config] of Object.entries(TEMPLATE_CONFIGS)) {
    await syncTemplate(templateName, config);
  }
  
  console.log();
  console.log(chalk.green.bold('🎉 Template sync complete!'));
  console.log();
  console.log('Next steps:');
  console.log(chalk.cyan('  • Test the CLI: npm link (in create-cinderblock-app folder)'));
  console.log(chalk.cyan('  • Create test project: npx create-cinderblock-app test-project'));
  console.log(chalk.cyan('  • Publish when ready: npm publish'));
}

// Handle command line execution
if (require.main === module) {
  main().catch(error => {
    console.error(chalk.red('Sync failed:'), error);
    process.exit(1);
  });
}

module.exports = { syncTemplate, TEMPLATE_CONFIGS };