# Development Guide for create-cinderblock-app

This guide explains how to develop and test `create-cinderblock-app` locally.

## Local Development Setup

### 1. Install Dependencies
```bash
cd packages/create-cinderblock-app
npm install --no-workspaces
```

### 2. Link for Global Usage
```bash
npm run dev
# or
npm link
```

This makes `create-cinderblock-app` available globally in your terminal.

### 3. Test the CLI
```bash
# Run automated test
npm test

# Or test manually
create-cinderblock-app my-test-app --use-npm
```

## How It Works for End Users

When users run `npx create-cinderblock-app my-app`:

1. **npx downloads the package** from npm registry
2. **CLI runs** with the specified project name
3. **Template files are copied** from the templates/ directory
4. **Dependencies are installed** using the user's preferred package manager
5. **Git repository is initialized** in the new project
6. **Success message** with next steps is displayed

## Dependencies

The CLI has its own dependencies that are bundled when published:

- `commander` - Command-line argument parsing
- `prompts` - Interactive prompts
- `chalk` - Terminal styling
- `fs-extra` - Enhanced file system operations
- `validate-npm-package-name` - Project name validation
- `cross-spawn` - Cross-platform process spawning

The generated projects have their own dependencies defined in the template's package.json.

## Templates

Templates are stored in `templates/` directory:

- `templates/default/` - Next.js starter with Cinderblock components
- `templates/blog/` - Blog template (coming soon)
- `templates/dashboard/` - Dashboard template (coming soon)
- `templates/ecommerce/` - E-commerce template (coming soon)

Template variables (like `{{PROJECT_NAME}}`) are replaced during project creation.

## Publishing

When ready to publish:

```bash
# Test locally first
npm test

# Create package tarball
npm pack

# Publish to npm (when ready)
npm publish
```

## Troubleshooting

### "Cannot find module" errors
Make sure dependencies are installed:
```bash
npm install --no-workspaces
```

### Workspace dependency issues
This package is designed to work independently of the monorepo workspace when published. The `--no-workspaces` flag ensures dependencies are installed normally during development.

### Testing with different package managers
```bash
create-cinderblock-app my-app --use-yarn
create-cinderblock-app my-app --use-pnpm  
create-cinderblock-app my-app --use-npm
```

## Usage Examples

### Basic usage
```bash
npx create-cinderblock-app my-app
```

### With options
```bash
npx create-cinderblock-app my-app --template default --use-yarn
```

### Interactive mode
```bash
npx create-cinderblock-app
# Will prompt for project name and options
```