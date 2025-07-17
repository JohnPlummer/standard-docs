# Claude Configuration for {{PROJECT_NAME}} (Backend API)

## Project Context
{{PROJECT_NAME}} is a backend API project built with {{FRAMEWORKS}}.

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

### API-Specific Documentation
- **[docs/API_REFERENCE.md](docs/API_REFERENCE.md)** - **Complete API documentation** with endpoints, parameters, and examples
- **[docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)** - **Database structure** and relationships

## AI Assistant Guidelines for API Development

### Before Making API Changes
1. **Read API_REFERENCE.md** to understand existing endpoints and patterns
2. **Check DATABASE_SCHEMA.md** for data relationships and constraints
3. **Review TROUBLESHOOTING.md** for common API issues and solutions
4. **Understand security patterns** from existing endpoint implementations

### When Adding New Endpoints
1. **Follow RESTful principles** and existing URL patterns shown in API_REFERENCE.md
2. **Implement proper authentication** - check existing patterns in codebase
3. **Add comprehensive validation** for all inputs
4. **Update API_REFERENCE.md** with new endpoint documentation
5. **Add appropriate error handling** and return consistent error formats
6. **Consider rate limiting** and security implications

### When Modifying Database Schema
1. **Create migrations** - never modify schema directly
2. **Update DATABASE_SCHEMA.md** with schema changes
3. **Consider backwards compatibility** for existing API endpoints
4. **Test data migration** thoroughly
5. **Update API_REFERENCE.md** if changes affect API responses

### When Debugging API Issues
1. **Check TROUBLESHOOTING.md first** - solution might already be documented
2. **Verify authentication** and authorization logic
3. **Check database connections** and query performance
4. **Review error logs** for specific error patterns
5. **Test with different input scenarios**

### API Development Best Practices
- **RESTful Design**: Use appropriate HTTP methods and status codes
- **Consistent Responses**: Follow established response format patterns
- **Input Validation**: Validate all inputs before processing
- **Error Handling**: Return meaningful error messages with appropriate HTTP status codes
- **Security**: Implement proper authentication, authorization, and input sanitization
- **Documentation**: Keep API_REFERENCE.md updated with all endpoint changes
- **Testing**: Write comprehensive tests for all endpoints

### Common API Patterns to Follow
(Reference API_REFERENCE.md and existing code for examples)
- **Authentication**: {{AUTH_PATTERN}}
- **Error Responses**: {{ERROR_RESPONSE_PATTERN}}
- **Pagination**: {{PAGINATION_PATTERN}}
- **Input Validation**: {{VALIDATION_PATTERN}}
- **Database Queries**: {{DB_QUERY_PATTERN}}

### Security Considerations for APIs
- **Authentication**: Verify user identity on all protected endpoints
- **Authorization**: Check permissions before allowing data access
- **Input Sanitization**: Sanitize all user inputs to prevent injection attacks
- **Rate Limiting**: Implement appropriate rate limits to prevent abuse
- **HTTPS**: Ensure all API communication uses HTTPS in production
- **Logging**: Log security events without exposing sensitive data

### Database Best Practices
- **Migrations**: Use migrations for all schema changes
- **Transactions**: Use database transactions for complex operations
- **Indexing**: Consider query performance when designing database queries
- **Connection Pooling**: Use connection pooling for database connections
- **Backup Strategy**: Ensure database backup procedures are in place

## Project-Specific Information

### Quick Reference
- **Primary Language**: {{PRIMARY_LANGUAGE}}
- **API Framework**: {{API_FRAMEWORK}}
- **Database**: {{DATABASE_TYPE}}
- **Authentication**: {{AUTH_TYPE}}
- **Install Command**: {{INSTALL_COMMAND}}
- **Start Command**: {{START_COMMAND}}
- **Test Command**: {{TEST_COMMAND}}
- **Migration Command**: {{MIGRATION_COMMAND}}

### Key Directories
- **{{API_DIR}}** - API route handlers
- **{{MODELS_DIR}}** - Data models
- **{{MIDDLEWARE_DIR}}** - Middleware functions
- **{{TESTS_DIR}}** - Test files
- **{{CONFIG_DIR}}** - Configuration files
- **{{MIGRATIONS_DIR}}** - Database migrations

### Important Notes for AI Assistance
- **Always check API_REFERENCE.md** for endpoint documentation before making changes
- **Refer to DATABASE_SCHEMA.md** for data relationships and constraints
- **Follow existing authentication patterns** shown in the codebase
- **Update documentation** when making API changes
- **Consider security implications** for all API modifications
- **Test thoroughly** including edge cases and error scenarios

---
*This file serves as a navigation hub for Claude working on API development. For detailed API information, refer to API_REFERENCE.md and DATABASE_SCHEMA.md.*

*Last updated: {{TIMESTAMP}}*