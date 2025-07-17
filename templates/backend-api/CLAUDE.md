# Claude Configuration for {{PROJECT_NAME}} (Backend API)

## Project Context
{{PROJECT_NAME}} is a backend API project built with {{FRAMEWORKS}}.

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

### API-Specific Documentation
- **[API Reference](docs/API_REFERENCE.md)** - Complete API documentation with endpoints, parameters, and examples
- **[Database Schema](docs/DATABASE_SCHEMA.md)** - Database structure, relationships, and data models

## API Information

### Base URLs
{{#each ENVIRONMENTS}}
- **{{name}}**: {{baseUrl}}
{{/each}}

### Authentication
- **Type**: {{AUTH_TYPE}}
- **Implementation**: {{AUTH_IMPLEMENTATION}}
- **Token Location**: {{TOKEN_LOCATION}}

### Key Endpoints
{{#each MAIN_ENDPOINTS}}
- **{{method}} {{path}}** - {{description}}
{{/each}}

### Database
- **Type**: {{DATABASE_TYPE}}
- **Host**: {{DATABASE_HOST}}
- **Schema**: See [Database Schema](docs/DATABASE_SCHEMA.md)

## Development Workflow

### Common Commands
```bash
# Install dependencies
{{INSTALL_COMMAND}}

# Start development server
{{START_COMMAND}}

# Run tests
{{TEST_COMMAND}}

# Run database migrations
{{MIGRATION_COMMAND}}

# Seed database
{{SEED_COMMAND}}

# Build for production
{{BUILD_COMMAND}}

# Run linter
{{LINT_COMMAND}}
```

### Project Structure
```
{{PROJECT_ROOT}}/
├── docs/                    # Project documentation
├── {{API_DIR}}/            # API route handlers
├── {{MODELS_DIR}}/         # Data models
├── {{MIDDLEWARE_DIR}}/     # Middleware functions
├── {{UTILS_DIR}}/          # Utility functions
├── {{TESTS_DIR}}/          # Test files
├── {{CONFIG_DIR}}/         # Configuration files
└── {{MIGRATIONS_DIR}}/     # Database migrations
```

## Key Information for AI Assistance

### API Development
- **Framework**: {{API_FRAMEWORK}}
- **ORM/Database**: {{DATABASE_ORM}}
- **Authentication**: {{AUTH_LIBRARY}}
- **Validation**: {{VALIDATION_LIBRARY}}
- **Documentation**: {{API_DOC_TOOL}}

### Database
- **Type**: {{DATABASE_TYPE}}
- **Migration Tool**: {{MIGRATION_TOOL}}
- **Query Builder**: {{QUERY_BUILDER}}
- **Connection Pool**: {{CONNECTION_POOL}}

### Security
- **Authentication**: {{AUTH_METHOD}}
- **Authorization**: {{AUTHORIZATION_METHOD}}
- **Input Validation**: {{VALIDATION_APPROACH}}
- **Rate Limiting**: {{RATE_LIMITING}}
- **CORS**: {{CORS_CONFIGURATION}}

## Development Guidelines

### API Development
1. **RESTful Design**: Follow REST principles for endpoint design
2. **Consistent Responses**: Use consistent response formats
3. **Error Handling**: Implement proper error handling and responses
4. **Input Validation**: Validate all inputs before processing
5. **Documentation**: Update API documentation for all changes

### Database Operations
1. **Migrations**: Use migrations for all schema changes
2. **Transactions**: Use transactions for complex operations
3. **Indexes**: Consider performance implications of queries
4. **Validation**: Implement both client and server-side validation
5. **Backups**: Ensure backup procedures are in place

### Security Best Practices
1. **Authentication**: Verify user identity on protected endpoints
2. **Authorization**: Check permissions before data access
3. **Input Sanitization**: Sanitize all user inputs
4. **SQL Injection**: Use parameterized queries
5. **Rate Limiting**: Implement rate limiting for API endpoints

## Testing Strategy
- **Unit Tests**: {{UNIT_TEST_FRAMEWORK}} for individual functions
- **Integration Tests**: {{INTEGRATION_TEST_FRAMEWORK}} for API endpoints
- **Database Tests**: {{DATABASE_TEST_APPROACH}} for data layer
- **Load Tests**: {{LOAD_TEST_TOOL}} for performance testing

## API Documentation

### Endpoint Documentation
Each endpoint should include:
- Method and path
- Authentication requirements
- Request parameters and body
- Response format and examples
- Error responses and codes
- Rate limiting information

### Example API Response Format
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Success message",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {}
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Environment Configuration

### Required Environment Variables
{{#each REQUIRED_ENV_VARS}}
- `{{name}}` - {{description}}
{{/each}}

### Optional Environment Variables
{{#each OPTIONAL_ENV_VARS}}
- `{{name}}` - {{description}} (Default: {{default}})
{{/each}}

## Monitoring and Logging

### Metrics
- **Request Rate**: {{REQUEST_RATE_METRIC}}
- **Response Time**: {{RESPONSE_TIME_METRIC}}
- **Error Rate**: {{ERROR_RATE_METRIC}}
- **Database Performance**: {{DATABASE_METRICS}}

### Logging
- **Level**: {{LOG_LEVEL}}
- **Format**: {{LOG_FORMAT}}
- **Destination**: {{LOG_DESTINATION}}

## AI Assistant Guidelines

### API Development Tasks
1. **New Endpoints**: Follow established patterns and update documentation
2. **Database Changes**: Create migrations and update schema documentation
3. **Authentication**: Implement proper security measures
4. **Testing**: Ensure comprehensive test coverage
5. **Performance**: Consider scalability and performance implications

### Code Review Focus
- Security vulnerabilities
- Performance bottlenecks
- Database query optimization
- Error handling completeness
- API documentation accuracy

### Common Patterns
- **Controller Pattern**: {{CONTROLLER_PATTERN}}
- **Service Layer**: {{SERVICE_LAYER_PATTERN}}
- **Repository Pattern**: {{REPOSITORY_PATTERN}}
- **Middleware Chain**: {{MIDDLEWARE_PATTERN}}

---
*Last updated: {{TIMESTAMP}}*
*Generated with [standard-docs](https://github.com/johnplummer/standard-docs)*