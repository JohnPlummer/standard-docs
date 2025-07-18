# Standard Docs

A comprehensive documentation system for software projects that integrates seamlessly with Claude Code via slash commands.

## Overview

Standard Docs provides Claude with the knowledge and templates needed to automatically generate project-specific documentation. Instead of complex setup scripts, it uses simple slash commands that tell Claude how to analyze your project and create appropriate documentation.

## Features

- **🤖 Claude Slash Commands** - Three simple commands to create, update, and analyze documentation
- **📝 Comprehensive Templates** - Ready-to-use documentation templates for different project types
- **🔍 Intelligent Analysis** - Claude analyzes your project structure and creates appropriate docs
- **📊 Git History Integration** - Updates documentation based on recent git commits
- **🎯 Project-Specific Content** - Tailored documentation for APIs, web apps, services, mobile apps, libraries, and monorepos
- **🔄 CLAUDE.md Deduplication** - Automatically prevents information duplication between CLAUDE.md and docs/
- **⚡ No Dependencies** - Pure template system with no Node.js dependencies required

## Supported Project Types

- **Backend APIs** - REST, GraphQL, gRPC APIs with endpoint documentation and OpenAPI 3.0 specification support
- **Frontend Web Apps** - React, Vue, Angular applications with component libraries  
- **Services** - Microservices, background workers, and distributed systems
- **Mobile Apps** - React Native, Flutter, and native mobile applications
- **Libraries/Packages** - npm, PyPI, and other distributable packages
- **Monorepos** - Multi-package repositories with workspace management

## Quick Start

### One-Line Installation

```bash
bash <(curl -sSL https://raw.githubusercontent.com/johnplummer/standard-docs/main/install.sh)
```

This installs:

- Claude slash commands in `.claude/commands/`
- Documentation templates in `.standard-docs-templates/`

**Alternative (non-interactive):**
```bash
curl -sSL https://raw.githubusercontent.com/johnplummer/standard-docs/main/install.sh | bash
```
Note: Non-interactive mode will skip existing files to avoid overwriting.

### Using the Slash Commands

Once installed, you can use these commands in Claude:

#### `/docs-create`

Set up documentation for a new project. Claude will:

- Analyze your project structure and detect the project type
- Create a `docs/` directory with appropriate documentation files
- Generate meaningful content based on your actual codebase
- Create or update `CLAUDE.md` file, avoiding duplication with docs/
- Check existing CLAUDE.md for duplicated content and ask for approval before changes

#### `/docs-update`

Update documentation based on git history. Claude will:

- Analyze recent git commits since last update
- Update relevant documentation files
- Refresh the `RECENT_CHANGES.md` file
- Ensure documentation stays current with code changes
- Check CLAUDE.md for duplicated content and ask for approval before changes

#### `/docs-analyze`

Analyze existing documentation quality. Claude will:

- Review all documentation files for completeness and accuracy
- Identify gaps and inconsistencies
- Assess documentation against best practices
- Analyze CLAUDE.md for duplicated content with docs/ directory
- Provide prioritized recommendations for improvement

## Generated Documentation

### Core Files (All Projects)

- `project-overview.md` - Project description, goals, and architecture
- `development-setup.md` - Environment setup and dependencies
- `key-components.md` - Main modules and their purposes
- `deployment-guide.md` - Deployment processes and environments
- `troubleshooting.md` - Common issues and solutions
- `recent-changes.md` - Changelog and recent updates

### Project-Specific Files

- **Backend APIs**: `api-reference.md`, `database-schema.md` (with OpenAPI 3.0 support)
- **Frontend Apps**: `component-library.md`, `routing-guide.md`
- **Services**: `service-architecture.md`
- **Mobile Apps**: `platform-guides.md`
- **Libraries**: `package-usage.md`
- **Monorepos**: `workspace-structure.md`, `cross-package-dependencies.md`

## How It Works

1. **Installation** - The install script copies slash commands and templates to your project
2. **Analysis** - Claude analyzes your project structure, dependencies, and code patterns
3. **Generation** - Claude creates documentation using appropriate templates
4. **Maintenance** - Use `/docs-update` to keep documentation current with code changes

## Template System

The templates use simple variable substitution:

- `{{PROJECT_NAME}}` - Your project name
- `{{PROJECT_DESCRIPTION}}` - Project description
- `{{FRAMEWORKS}}` - Detected frameworks and technologies
- `{{TIMESTAMP}}` - Current timestamp

Claude fills these variables with actual information from your project.

## Requirements

- **Git** - Required for git history analysis
- **Claude Code** - For running the slash commands

No Node.js or other dependencies are required!

## Manual Installation

If you prefer not to use the install script:

1. Create `.claude/commands/` directory in your project
2. Copy the three `.md` files from the `commands/` directory
3. Copy the `templates/` directory to `.standard-docs-templates/`
4. Run `/docs-create` in Claude

## Examples

### Creating Documentation for a React App

```text
/docs-create
```

Claude will detect it's a React app and create:

- Core documentation files
- `component-library.md` with component documentation
- `routing-guide.md` with routing information

### Updating Documentation After Changes

```text
/docs-update
```

Claude will analyze recent commits and update relevant docs.

### Analyzing Documentation Quality

```text
/docs-analyze
```

Claude will review all docs and provide improvement recommendations.

## Support

- **GitHub**: <https://github.com/johnplummer/standard-docs>
- **Issues**: <https://github.com/johnplummer/standard-docs/issues>

## License

MIT - See [LICENSE](LICENSE) file for details.

---

Happy documenting with Claude! 🎉
