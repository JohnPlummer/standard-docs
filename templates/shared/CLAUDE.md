# Claude Configuration for {{PROJECT_NAME}}

## Project Context
{{PROJECT_NAME}} is a {{PROJECT_TYPE}} project built with {{FRAMEWORKS}}.

{{PROJECT_DESCRIPTION}}

## Documentation Navigation

This project uses a structured documentation system. When helping with this project, **always refer to the relevant documentation files** rather than making assumptions.

### Core Documentation Files
- **[docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md)** - **Start here** for project architecture, goals, and technical overview
- **[docs/DEVELOPMENT_SETUP.md](docs/DEVELOPMENT_SETUP.md)** - **Essential** for environment setup, dependencies, and getting started
- **[docs/KEY_COMPONENTS.md](docs/KEY_COMPONENTS.md)** - **Reference** for main modules, their responsibilities, and relationships
- **[docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)** - **Use** for deployment processes, environments, and procedures
- **[docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)** - **Check first** for common issues and debugging approaches
- **[docs/RECENT_CHANGES.md](docs/RECENT_CHANGES.md)** - **Review** for recent updates and changelog

## AI Assistant Guidelines

### Before Making Any Changes
1. **Read PROJECT_OVERVIEW.md** to understand the project's purpose and architecture
2. **Check DEVELOPMENT_SETUP.md** for project-specific setup and commands
3. **Review KEY_COMPONENTS.md** to understand how components relate to each other
4. **Look at RECENT_CHANGES.md** to understand recent project evolution

### When Adding Features
1. **Follow established patterns** found in KEY_COMPONENTS.md
2. **Update relevant documentation** - don't leave docs out of sync
3. **Check DEPLOYMENT_GUIDE.md** if changes affect deployment
4. **Add any new issues to TROUBLESHOOTING.md** if they might affect others

### When Fixing Bugs
1. **Check TROUBLESHOOTING.md first** - solution might already be documented
2. **Understand root cause** using project architecture from PROJECT_OVERVIEW.md
3. **Update TROUBLESHOOTING.md** with new solutions for future reference
4. **Update RECENT_CHANGES.md** with the fix details

### When Updating Documentation
1. **Keep information in the right place** - don't duplicate across files
2. **Update RECENT_CHANGES.md** when making significant doc changes
3. **Cross-reference related information** instead of copying it
4. **Maintain consistency** with existing documentation style and structure

## Project-Specific Information

### Quick Reference
- **Primary Language**: {{PRIMARY_LANGUAGE}}
- **Main Framework**: {{FRAMEWORK}}
- **Install Command**: {{INSTALL_COMMAND}}
- **Start Command**: {{START_COMMAND}}
- **Test Command**: {{TEST_COMMAND}}
- **Build Command**: {{BUILD_COMMAND}}

### Key Directories
- **{{MAIN_SOURCE_DIR}}** - Main source code
- **{{TEST_DIR}}** - Test files  
- **{{CONFIG_DIR}}** - Configuration files
- **docs/** - All project documentation

### Important Notes for AI Assistance
- **Always verify** information against current codebase - don't rely on assumptions
- **Refer to documentation** rather than duplicating information
- **Update documentation** when making changes that affect setup, architecture, or usage
- **Follow established patterns** shown in existing code and documented in KEY_COMPONENTS.md
- **Consider security implications** for all changes, especially in production systems

### Common Patterns to Follow
(Reference KEY_COMPONENTS.md for detailed patterns)
- **Code Organization**: {{CODE_ORGANIZATION_PATTERN}}
- **Error Handling**: {{ERROR_HANDLING_PATTERN}}
- **Testing Approach**: {{TESTING_APPROACH}}
- **Configuration Management**: {{CONFIG_MANAGEMENT_PATTERN}}

---
*This file serves as a navigation hub for Claude. For detailed project information, refer to the specific documentation files listed above.*

*Last updated: {{TIMESTAMP}}*