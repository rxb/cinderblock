# Template Sync Workflow

This document describes how the templates in create-cinderblock-app should be kept in sync with the starter packages.

## Design Flow

**Starter packages are the source of truth** → Templates are generated from them

```
packages/starter-nextjs-default/     →  packages/create-cinderblock-app/templates/nextjs-default/
packages/starter-nextjs-blog/        →  packages/create-cinderblock-app/templates/nextjs-blog/
packages/starter-nextjs-kitchensink/ →  packages/create-cinderblock-app/templates/nextjs-kitchensink/
```

## Workflow

1. **Development happens in starter packages** - All new features, bug fixes, and changes should be made in the `starter-*` packages first
2. **Templates are synced from starters** - After changes are made to starter packages, templates need to be updated to match
3. **Templates use template placeholders** - Some files in templates contain placeholders like `{{PROJECT_NAME}}` that get replaced during project creation

## Manual Sync Process

### 1. Compare starters with templates

Use diff to identify differences:

```bash
diff -r --brief packages/starter-nextjs-default packages/create-cinderblock-app/templates/nextjs-default | grep -v node_modules | grep -v package-lock
```

### 2. Copy files from starters to templates

Copy any new or modified files from the starter to the template, being careful to:
- Preserve template placeholders (especially in package.json)
- Skip IDE files (.DS_Store, .gitignore in starters)
- Skip generated files (node_modules, package-lock.json)

### 3. Handle special files

**package.json:**
- Keep `"name": "{{PROJECT_NAME}}"` in templates
- Change `@cinderblock/design-system": "workspace:*"` to `"@cinderblock/design-system": "^0.0.1"` in templates
- Copy all other dependencies and scripts from starter

**README.md:**
- Templates may have different README content optimized for new projects

### 4. Remove obsolete files

If files are removed from starters, they should also be removed from templates.

## Automation

Consider creating a sync script (`sync-templates.js`) to automate this process:
- Compare file structures
- Copy files while preserving template placeholders
- Report changes made

## Verification

After syncing, verify templates work correctly:

```bash
# Test template creation
npx ./bin/create-cinderblock-app test-project --template default
cd test-project
npm run dev
```

## Current Template Status

Last synced: [Current Date]
Templates are now in sync with their corresponding starter packages.