# {{PROJECT_NAME}} - API Reference

## Base URL
{{#each ENVIRONMENTS}}
- **{{name}}:** {{baseUrl}}
{{/each}}

## Authentication
{{#if HAS_AUTH}}
{{AUTH_TYPE}} authentication is required for most endpoints.

{{#if AUTH_TYPE === 'Bearer'}}
Include the token in the Authorization header:
```
Authorization: Bearer <your-token>
```
{{/if}}

{{#if AUTH_TYPE === 'API Key'}}
Include the API key in the header:
```
{{API_KEY_HEADER}}: <your-api-key>
```
{{/if}}
{{/if}}

## API Endpoints

{{#each ENDPOINTS}}
### {{method}} {{path}}
{{#if description}}
{{description}}
{{/if}}

{{#if auth}}
**Authentication:** {{auth}}
{{/if}}

**Parameters:**
{{#each parameters}}
- `{{name}}` ({{type}}) {{#if required}}**Required**{{/if}} - {{description}}
{{/each}}

**Request Body:**
{{#if requestBody}}
```json
{{requestBody}}
```
{{/if}}

**Response:**
{{#each responses}}
**{{status}}** - {{description}}
```json
{{example}}
```
{{/each}}

**Example Request:**
```bash
curl -X {{method}} "{{../BASE_URL}}{{path}}" \
{{#if ../HAS_AUTH}}  -H "Authorization: Bearer <token>" \{{/if}}
{{#if requestBody}}  -H "Content-Type: application/json" \
  -d '{{requestBody}}'{{/if}}
```

---
{{/each}}

## Data Models

{{#each MODELS}}
### {{name}}
{{#if description}}
{{description}}
{{/if}}

```json
{{schema}}
```

**Properties:**
{{#each properties}}
- `{{name}}` ({{type}}) {{#if required}}**Required**{{/if}} - {{description}}
{{/each}}

---
{{/each}}

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

### Common Error Codes
{{#each ERROR_CODES}}
- `{{code}}` ({{status}}) - {{description}}
{{/each}}

## Rate Limiting
{{#if HAS_RATE_LIMITING}}
- **Rate limit:** {{RATE_LIMIT}}
- **Rate limit headers:**
  - `X-RateLimit-Limit`: Total requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset time (Unix timestamp)
{{/if}}

## Pagination
{{#if HAS_PAGINATION}}
Large result sets are paginated using {{PAGINATION_TYPE}}.

**Query Parameters:**
{{#each PAGINATION_PARAMS}}
- `{{name}}` - {{description}}
{{/each}}

**Response Headers:**
{{#each PAGINATION_HEADERS}}
- `{{name}}` - {{description}}
{{/each}}
{{/if}}

## Webhooks
{{#if HAS_WEBHOOKS}}
{{#each WEBHOOKS}}
### {{name}}
**Event:** {{event}}
**URL:** Your configured webhook URL
**Method:** POST

**Payload:**
```json
{{payload}}
```
{{/each}}
{{/if}}

## SDK & Libraries
{{#each SDKS}}
- **{{language}}:** {{#if url}}[{{name}}]({{url}}){{else}}{{name}}{{/if}}
{{/each}}

---
*Last updated: {{TIMESTAMP}}*
*Generated with [standard-docs](https://github.com/johnplummer/standard-docs)*