# Claude Configuration for {{PROJECT_NAME}}

## Project Context
{{PROJECT_NAME}} is a {{PROJECT_TYPE}} project built with {{FRAMEWORKS}}.

{{PROJECT_DESCRIPTION}}

## Documentation Structure
The project documentation is organized in the `docs/` directory:

### Core Documentation
- **[Project Overview](docs/PROJECT_OVERVIEW.md)** - Project purpose, goals, and high-level architecture
- **[Development Setup](docs/DEVELOPMENT_SETUP.md)** - Environment setup, dependencies, and getting started
- **[Key Components](docs/KEY_COMPONENTS.md)** - Main modules, their responsibilities, and relationships
- **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** - Deployment processes, environments, and procedures
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues, debugging tips, and solutions
- **[Recent Changes](docs/RECENT_CHANGES.md)** - Recent updates, changes, and changelog

## Development Workflow

### Common Commands
```bash
# Install dependencies
{{INSTALL_COMMAND}}

# Start development server
{{START_COMMAND}}

# Run tests
{{TEST_COMMAND}}

# Build for production
{{BUILD_COMMAND}}

# Run linter
{{LINT_COMMAND}}

# Format code
{{FORMAT_COMMAND}}
```

### Project Structure
```
{{PROJECT_ROOT}}/
├── docs/                    # Project documentation
├── {{MAIN_SOURCE_DIR}}/     # Main source code
├── {{TEST_DIR}}/            # Test files
├── {{CONFIG_DIR}}/          # Configuration files
└── {{BUILD_DIR}}/           # Build output
```

## Key Information for AI Assistance

### Code Conventions
- **Language**: {{PRIMARY_LANGUAGE}}
- **Framework**: {{FRAMEWORK}}
- **Style Guide**: {{STYLE_GUIDE}}
- **Naming Convention**: {{NAMING_CONVENTION}}

### Important Files
- **Configuration**: {{CONFIG_FILES}}
- **Entry Points**: {{ENTRY_POINTS}}
- **Key Modules**: {{KEY_MODULES}}

### Dependencies
- **Runtime**: {{RUNTIME_DEPENDENCIES}}
- **Development**: {{DEV_DEPENDENCIES}}
- **Peer**: {{PEER_DEPENDENCIES}}

## Development Guidelines

### Before Making Changes
1. Review relevant documentation in `docs/`
2. Understand the component relationships
3. Check existing patterns and conventions
4. Consider impact on other parts of the system

### When Adding Features
1. Follow established architectural patterns
2. Update relevant documentation
3. Add appropriate tests
4. Consider security implications
5. Update API documentation if applicable

### When Fixing Bugs
1. Reproduce the issue
2. Identify root cause
3. Fix the underlying problem
4. Add tests to prevent regression
5. Update troubleshooting documentation

## Testing Strategy
- **Unit Tests**: {{UNIT_TEST_FRAMEWORK}}
- **Integration Tests**: {{INTEGRATION_TEST_FRAMEWORK}}
- **E2E Tests**: {{E2E_TEST_FRAMEWORK}}
- **Test Coverage**: {{TEST_COVERAGE_REQUIREMENT}}

## Quality Assurance
- **Code Review**: {{CODE_REVIEW_PROCESS}}
- **Continuous Integration**: {{CI_PLATFORM}}
- **Code Quality**: {{CODE_QUALITY_TOOLS}}
- **Security Scanning**: {{SECURITY_TOOLS}}

## Deployment
- **Environment**: {{DEPLOYMENT_ENVIRONMENT}}
- **Process**: {{DEPLOYMENT_PROCESS}}
- **Monitoring**: {{MONITORING_TOOLS}}
- **Rollback**: {{ROLLBACK_PROCESS}}

## Team Information
- **Team**: {{TEAM_NAME}}
- **Communication**: {{TEAM_COMMUNICATION}}
- **Issue Tracking**: {{ISSUE_TRACKER}}
- **Documentation**: {{DOCUMENTATION_LOCATION}}

## AI Assistant Guidelines

### Preferred Approach
1. **Understand First**: Always review relevant documentation before making changes
2. **Follow Patterns**: Use established patterns and conventions
3. **Be Comprehensive**: Consider all aspects of a change (code, tests, docs)
4. **Security First**: Always consider security implications
5. **Document Changes**: Update documentation when making significant changes

### Common Tasks
- **Code Review**: Check against established patterns and conventions
- **Debugging**: Use troubleshooting documentation and established debugging practices
- **Feature Development**: Follow architectural patterns and update documentation
- **Documentation**: Keep docs synchronized with code changes
- **Testing**: Ensure adequate test coverage for changes

### Important Notes
- Always verify information against the current codebase
- Refer to project-specific documentation for detailed guidance
- Consider the impact of changes on the entire system
- Follow the established development workflow
- Maintain code quality and security standards

---
*Last updated: {{TIMESTAMP}}*
*Generated with [standard-docs](https://github.com/johnplummer/standard-docs)*