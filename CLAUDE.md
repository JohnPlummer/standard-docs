# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Standard-docs is a Node.js CLI tool that automatically generates and maintains comprehensive documentation for software projects. It features intelligent project type detection, template-based documentation generation, and special integration with Claude AI through slash commands.

## Commands

### Development

```bash
# Install dependencies
npm install

# Run project type detection
npm run detect
# Or directly: node scripts/detect-project-type.js

# Run interactive setup
npm run setup
# Or directly: node scripts/setup.js

# Update documentation from git history
npm run update
# Or directly: node scripts/update-from-git.js
```

### Testing and Validation

```bash
# Test the installation script
./install.sh

# Test detection on example projects
node scripts/detect-project-type.js examples/backend-api-example
node scripts/detect-project-type.js examples/frontend-webapp-example
node scripts/detect-project-type.js examples/monorepo-example
```

## Architecture

### Core Components

1. **Project Type Detector** (`scripts/detect-project-type.js`):
   - Analyzes package.json patterns, dependencies, and file structures
   - Returns project type with confidence score
   - Supports: backend-api, frontend-webapp, library, mobile-app, monorepo, service

2. **Template System** (`templates/`):
   - Handlebars-style variable substitution: `{{variable_name}}`
   - Project-type specific templates inherit from shared templates
   - Key templates: PROJECT_OVERVIEW, DEVELOPMENT_SETUP, KEY_COMPONENTS, DEPLOYMENT_GUIDE, TROUBLESHOOTING, RECENT_CHANGES, CLAUDE.md

3. **Installation System**:
   - `install.sh`: Bash script for one-line installation
   - `scripts/install.js`: Cross-platform installation logic
   - Creates `.standard-docs/` directory in target projects
   - Sets up local scripts and Claude integration

4. **Slash Commands** (`slash-commands/`):
   - `/docs-create`: Creates new documentation from templates
   - `/docs-update`: Updates documentation from git commits
   - `/docs-analyze`: Analyzes documentation quality and coverage

### Template Variable System

Common variables available in all templates:

- `{{project_name}}` - From package.json name field
- `{{project_type}}` - Detected project type
- `{{framework}}` - Detected framework (React, Vue, Express, etc.)
- `{{description}}` - From package.json description
- `{{repository}}` - Git repository URL
- `{{main_entry}}` - Main entry point file

### Project Detection Logic

The detector analyzes in this order:

1. package.json dependencies and scripts
2. File patterns (e.g., `app.js` → backend, `index.html` → frontend)
3. Directory structure (e.g., `components/` → frontend, `models/` → backend)
4. Framework-specific files (e.g., `next.config.js`, `vue.config.js`)

Returns highest confidence match with detailed reasoning.

## Key Implementation Details

- Node.js 16+ required for ES modules and modern JavaScript features
- Uses `fs-extra` for reliable cross-platform file operations
- Git operations via `simple-git` library
- Interactive prompts with `inquirer`
- Terminal styling with `chalk`
- Pattern matching with `glob`

## Working with Templates

When modifying templates:

1. Shared templates in `templates/shared/` apply to all project types
2. Project-specific templates override shared ones
3. Use Handlebars syntax for variables: `{{variable_name}}`
4. Test changes with example projects in `examples/`

## Integration Points

- Designed to work within target project's `.standard-docs/` directory
- Creates convenience scripts that reference the installation
- Slash commands integrate with Claude AI for documentation tasks
- Git hooks can trigger automatic documentation updates
