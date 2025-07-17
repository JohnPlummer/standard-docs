# Standard Docs

A comprehensive documentation system for software projects that integrates seamlessly with Claude Code.

## Overview

Standard Docs automatically generates project-specific documentation templates based on your codebase, providing a consistent documentation structure across different project types. It includes intelligent project type detection, customizable templates, and seamless integration with Claude AI for ongoing documentation maintenance.

## Features

- **🔍 Smart Project Detection** - Automatically detects project type and frameworks
- **📝 Comprehensive Templates** - Ready-to-use documentation templates for different project types
- **🤖 Claude Integration** - Built-in Claude slash commands for documentation management
- **📊 Git History Analysis** - Automatic documentation updates based on git commits
- **🎯 Project-Specific Content** - Tailored documentation for APIs, web apps, services, mobile apps, libraries, and monorepos
- **⚙️ Interactive Setup** - Guided setup process with customization options
- **🔄 Automated Updates** - Keep documentation synchronized with code changes

## Supported Project Types

- **Backend APIs** - REST, GraphQL, gRPC APIs with endpoint documentation
- **Frontend Web Apps** - React, Vue, Angular applications with component libraries
- **Services** - Microservices, background workers, and distributed systems
- **Mobile Apps** - React Native, Flutter, and native mobile applications
- **Libraries/Packages** - npm, PyPI, and other distributable packages
- **Monorepos** - Multi-package repositories with workspace management

## Quick Start

### One-Line Installation

```bash
curl -sSL https://raw.githubusercontent.com/johnplummer/standard-docs/main/install.sh | bash
```

### Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/johnplummer/standard-docs.git
cd standard-docs
npm install
```

2. Run the installer in your project:
```bash
node scripts/install.js /path/to/your/project
```

3. Follow the interactive setup process.

## Usage

### Claude Slash Commands

Once installed, you can use these Claude slash commands:

- `/docs-create` - Set up documentation for a new project
- `/docs-update` - Update documentation based on git history
- `/docs-analyze` - Analyze existing documentation quality

### Manual Commands

```bash
# Detect project type
./standard-docs detect

# Run interactive setup
./standard-docs setup

# Update documentation from git history
./standard-docs update
```

## Generated Documentation

### Core Documentation (All Projects)

- **PROJECT_OVERVIEW.md** - Project purpose, goals, and architecture
- **DEVELOPMENT_SETUP.md** - Environment setup and development workflow
- **KEY_COMPONENTS.md** - Main modules and their responsibilities
- **DEPLOYMENT_GUIDE.md** - Deployment processes and environments
- **TROUBLESHOOTING.md** - Common issues and solutions
- **RECENT_CHANGES.md** - Recent updates and changelog

### Project-Specific Documentation

#### Backend APIs
- **API_REFERENCE.md** - Complete API documentation with endpoints
- **DATABASE_SCHEMA.md** - Database structure and relationships

#### Frontend Web Apps
- **COMPONENT_LIBRARY.md** - Reusable components and design system
- **ROUTING_GUIDE.md** - Application routing and navigation

#### Services
- **SERVICE_ARCHITECTURE.md** - Service design and integration patterns

#### Mobile Apps
- **PLATFORM_GUIDES.md** - iOS and Android specific information

#### Libraries
- **PACKAGE_USAGE.md** - Installation and usage instructions

#### Monorepos
- **WORKSPACE_STRUCTURE.md** - Workspace organization and management
- **CROSS_PACKAGE_DEPENDENCIES.md** - Package relationships and dependencies

## Configuration

### CLAUDE.md

Each project gets a `CLAUDE.md` file that serves as the main configuration for Claude AI assistance:

```markdown
# Claude Configuration for MyProject

## Project Context
This is a backend API project built with Node.js and Express.

## Documentation
- [API Reference](docs/API_REFERENCE.md) - Complete API documentation
- [Database Schema](docs/DATABASE_SCHEMA.md) - Database structure

## Development Commands
- Start: `npm start`
- Test: `npm test`
- Build: `npm run build`
```

### Template Customization

Templates use Handlebars-style syntax for variable substitution:

```markdown
# {{PROJECT_NAME}} - Project Overview

## Description
{{PROJECT_DESCRIPTION}}

## Technology Stack
{{#each FRAMEWORKS}}
- {{this}}
{{/each}}
```

## Project Structure

```
your-project/
├── docs/                           # Generated documentation
│   ├── PROJECT_OVERVIEW.md
│   ├── DEVELOPMENT_SETUP.md
│   ├── KEY_COMPONENTS.md
│   ├── API_REFERENCE.md           # (APIs only)
│   ├── COMPONENT_LIBRARY.md       # (Frontend only)
│   └── ...
├── CLAUDE.md                      # Claude AI configuration
├── .claude/
│   └── slash-commands/           # Claude slash commands
│       ├── docs-create.md
│       ├── docs-update.md
│       └── docs-analyze.md
└── .standard-docs/               # Standard Docs installation
    ├── scripts/
    └── templates/
```

## Advanced Features

### Git History Analysis

Standard Docs can analyze your git history to automatically update documentation:

```bash
# Update documentation based on recent commits
./standard-docs update
```

This analyzes:
- Commit messages and changes
- New features and bug fixes
- Breaking changes and migrations
- Dependency updates
- Performance improvements

### Project Type Detection

The system intelligently detects project types by analyzing:
- Package.json dependencies
- File structure and patterns
- Framework-specific files
- Configuration files
- Build tools and scripts

### Template Engine

Templates support:
- Variable substitution
- Conditional sections
- Loops and iterations
- Project-specific customization
- Framework-specific content

## Integration with CI/CD

### GitHub Actions

```yaml
name: Update Documentation
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  update-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Update Documentation
        run: ./standard-docs update
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/
          git commit -m "Update documentation" || exit 0
          git push
```

## Contributing

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/standard-docs.git`
3. Install dependencies: `npm install`
4. Run tests: `npm test`

### Adding New Project Types

1. Create templates in `templates/your-project-type/`
2. Update the project detection logic in `scripts/detect-project-type.js`
3. Add setup questions in `scripts/setup.js`
4. Create Claude.md template in `templates/your-project-type/CLAUDE.md`

### Adding New Templates

1. Create template files with Handlebars syntax
2. Add template variables to the setup script
3. Update the README with template descriptions
4. Add examples to the examples directory

## Examples

### Backend API Project

```bash
# Install Standard Docs
curl -sSL https://raw.githubusercontent.com/johnplummer/standard-docs/main/install.sh | bash

# The system detects it's a Node.js API project
# Generates: API_REFERENCE.md, DATABASE_SCHEMA.md, etc.
# Creates CLAUDE.md with API-specific configuration
```

### Frontend Web App

```bash
# Install Standard Docs
curl -sSL https://raw.githubusercontent.com/johnplummer/standard-docs/main/install.sh | bash

# Detects React/Vue/Angular project
# Generates: COMPONENT_LIBRARY.md, ROUTING_GUIDE.md, etc.
# Creates CLAUDE.md with frontend-specific configuration
```

### Monorepo

```bash
# Install Standard Docs
curl -sSL https://raw.githubusercontent.com/johnplummer/standard-docs/main/install.sh | bash

# Detects monorepo structure
# Generates: WORKSPACE_STRUCTURE.md, CROSS_PACKAGE_DEPENDENCIES.md
# Creates CLAUDE.md with monorepo-specific configuration
```

## FAQ

### Q: Can I use Standard Docs with existing documentation?
A: Yes, Standard Docs will merge with existing documentation and create backups of any conflicting files.

### Q: How does project type detection work?
A: The system analyzes package.json, file structure, and configuration files to determine the project type and frameworks being used.

### Q: Can I customize the templates?
A: Yes, templates are fully customizable. You can modify existing templates or create new ones for your specific needs.

### Q: Does it work with non-JavaScript projects?
A: Yes, while optimized for JavaScript projects, Standard Docs works with any project type and can detect various languages and frameworks.

### Q: How do I update documentation automatically?
A: Use the `/docs-update` Claude slash command or run `./standard-docs update` to analyze git history and update documentation accordingly.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/johnplummer/standard-docs/issues)
- **Documentation**: [Full documentation](https://github.com/johnplummer/standard-docs/wiki)
- **Examples**: [Example projects](https://github.com/johnplummer/standard-docs/tree/main/examples)

---

*Standard Docs - Making project documentation effortless and consistent.*