# {{PROJECT_NAME}} - Project Overview

## Description
{{PROJECT_DESCRIPTION}}

## Purpose & Goals
<!-- What problem does this project solve? What are its main objectives? -->

## High-Level Architecture
<!-- Describe the overall system architecture, main components, and how they interact -->

## Technology Stack
{{#each FRAMEWORKS}}
- {{this}}
{{/each}}

## Key Features
<!-- List the main features and capabilities of this project -->

## Project Structure
```
{{PROJECT_ROOT}}/
├── {{#each MAIN_DIRECTORIES}}
├── {{this}}/
{{/each}}
```

## Getting Started
For development setup instructions, see [DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md).

## Related Documentation
- [Development Setup](./DEVELOPMENT_SETUP.md)
- [Key Components](./KEY_COMPONENTS.md)
- [API Reference](./API_REFERENCE.md) {{#if HAS_API}}{{/if}}
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Troubleshooting](./TROUBLESHOOTING.md)

## Contact & Support
<!-- Project maintainers, support channels, etc. -->

---
*Last updated: {{TIMESTAMP}}*
*Generated with [standard-docs](https://github.com/johnplummer/standard-docs)*
