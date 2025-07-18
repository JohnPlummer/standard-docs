# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Standard-docs is a pure template-based documentation system that integrates with Claude Code via slash commands. It provides comprehensive documentation templates for different project types without requiring Node.js or external dependencies.

## Commands

### Development

```bash
# Test the installation script
./install.sh

# Test slash commands in Claude Code
# Run any of the three slash commands: /docs-create, /docs-update, /docs-analyze
```

### Testing and Validation

```bash
# Test the installation script in a test project
cd /path/to/test-project
curl -sSL https://raw.githubusercontent.com/johnplummer/standard-docs/main/install.sh | bash

# Verify templates are installed
ls -la .standard-docs-templates/
ls -la .claude/commands/
```

## Architecture

### Core Components

1. **Template System** (`templates/`):
   - Handlebars-style variable substitution: `{{variable_name}}`
   - Project-type specific templates inherit from shared templates
   - Key templates: project-overview, development-setup, key-components, deployment-guide, troubleshooting, recent-changes, CLAUDE.md
   - OpenAPI 3.0 support for backend APIs

2. **Installation System**:
   - `install.sh`: Bash script for one-line installation
   - Creates `.standard-docs-templates/` directory in target projects
   - Sets up Claude slash commands in `.claude/commands/`

3. **Slash Commands** (`commands/`):
   - `/docs-create`: Creates new documentation from templates
   - `/docs-update`: Updates documentation from git commits
   - `/docs-analyze`: Analyzes documentation quality and coverage
   - **CLAUDE.md Deduplication**: See README.md for detailed information about the deduplication feature

### Template Variable System

Common variables available in all templates:

- `{{project_name}}` - From package.json name field
- `{{project_type}}` - Detected project type
- `{{framework}}` - Detected framework (React, Vue, Express, etc.)
- `{{description}}` - From package.json description
- `{{repository}}` - Git repository URL
- `{{main_entry}}` - Main entry point file

### Project Detection Logic

Claude analyzes projects in this order:

1. package.json dependencies and scripts
2. File patterns (e.g., `app.js` → backend, `index.html` → frontend)
3. Directory structure (e.g., `components/` → frontend, `models/` → backend)
4. Framework-specific files (e.g., `next.config.js`, `vue.config.js`)
5. OpenAPI specifications (e.g., `openapi.yaml`, `swagger.json`)

Returns highest confidence match with detailed reasoning.

## Key Implementation Details

- **Pure template system** - No Node.js dependencies required
- **Bash installation script** - Cross-platform compatible
- **Claude Code integration** - Works via slash commands
- **Git integration** - Analyzes git history for documentation updates
- **OpenAPI 3.0 support** - Enhanced API documentation for backend projects
- **CLAUDE.md Deduplication** - See README.md for details

## Working with Templates

When modifying templates:

1. Shared templates in `templates/shared/` apply to all project types
2. Project-specific templates override shared ones
3. Use Handlebars syntax for variables: `{{variable_name}}`
4. Test changes by running `/docs-create` in a test project

## Integration Points

- Templates installed in target project's `.standard-docs-templates/` directory
- Slash commands installed in `.claude/commands/` directory
- Integrates with Claude Code for documentation tasks
- Analyzes git history for documentation updates
- Supports OpenAPI specifications for enhanced API documentation

## CLAUDE.md Deduplication System

For detailed information about how the CLAUDE.md deduplication feature works, see the README.md file.
