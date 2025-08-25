---
title: Get Tenant API Key
description: Retrieve the API key associated with a specific tenant
---

# Get Tenant API Key 🌐

Retrieves the API key associated with a specific tenant. This is typically used for tenant discovery and initial API key retrieval.

## Endpoint
**GET** `/api/ApiKey/{tenantId}/apikey`

<HeaderBadge 
  type="anonymous" 
  icon="🌐" 
  label="Anonymous"
  :headers="['Accept: application/json']"
/>

::: tip Authentication Type
🌐 **Anonymous** - No API key or JWT token required
:::

## Request Example
```bash
curl -X GET https://shipyo.it/api/ApiKey/1/apikey \
  -H "Accept: application/json"
```

## Path Parameters
- `tenantId` (long, required): Tenant ID to get the API key for

## Success Response
```json
{
  "success": true,
  "data": {
    "key": "ak_tenant1_abcdef1234567890",
    "isActive": true,
    "tenantId": 1,
    "tenantName": "Example Company"
  },
  "message": "API Key retrieved successfully"
}
```

## Error Responses

### 404 Not Found - API Key Not Configured
```json
{
  "success": false,
  "message": "API Key not configured for tenant",
  "errors": ["No API key has been configured for tenant ID 1"]
}
```

### 400 Bad Request - API Key Not Active
```json
{
  "success": false,
  "message": "API Key is not active or expired",
  "errors": ["The API key for this tenant is currently inactive"]
}
```

### 404 Not Found - Tenant Not Found
```json
{
  "success": false,
  "message": "Tenant not found",
  "errors": ["No tenant found with ID 1"]
}
```

## Usage Scenarios

### Initial Setup Flow
This endpoint is commonly used in the following flow:

1. **Tenant Discovery**: Client knows tenant ID but needs API key
2. **API Key Retrieval**: Get the tenant's API key using this endpoint
3. **Authentication**: Use retrieved API key for subsequent API calls
4. **Token Generation**: Generate JWT token using the API key

### Example Complete Flow
```bash
# 1. Get tenant API key (no auth required)
TENANT_API_KEY=$(curl -s -X GET https://shipyo.it/api/ApiKey/1/apikey | jq -r '.data.key')

# 2. Generate JWT token using the API key
JWT_TOKEN=$(curl -s -X POST https://shipyo.it/api/Token/generate \
  -H "x-api-key: $TENANT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}' | jq -r '.data')

# 3. Use both API key and JWT for protected endpoints
curl -X GET https://shipyo.it/api/User/getAll \
  -H "x-api-key: $TENANT_API_KEY" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

## Security Considerations

### Anonymous Access
- This endpoint is anonymous to enable tenant discovery
- No authentication headers required
- Publicly accessible information

### API Key Exposure
- Returns the actual API key value
- API key can be used immediately for authentication
- Ensure secure handling of the returned key

### Rate Limiting
- May be subject to rate limiting to prevent abuse
- Implement appropriate caching to avoid repeated calls
- Monitor for unusual access patterns

## Common Use Cases

### Multi-Tenant Applications
- Tenant selection during login process
- Dynamic API key retrieval based on user's tenant
- Client-side tenant configuration

### Integration Setup
- Initial setup of integrations with specific tenants
- Automated deployment scripts that need tenant API keys
- Third-party service configurations

### Development and Testing
- Development environment setup
- Automated testing with different tenant contexts
- Sandbox environment configuration

## Best Practices

### Caching
- Cache retrieved API keys to reduce API calls
- Implement appropriate cache expiration
- Handle cache invalidation when keys change

### Error Handling
- Always check if API key is active before using
- Handle tenant not found scenarios gracefully
- Implement retry logic for temporary failures

### Security
- Store retrieved API keys securely
- Use HTTPS for all API key retrieval
- Monitor API key usage after retrieval

## Integration with Other Endpoints

This endpoint is often used in conjunction with:

- **[User Login](/auth/login)** - After getting API key, authenticate users
- **[Generate JWT Token](/auth/token)** - Create tokens using retrieved API key
- **[Token from API Key](/auth/token-from-key)** - Generate JWT from retrieved key

## Troubleshooting

### Common Issues

1. **Tenant Not Found**: Verify tenant ID exists and is active
2. **No API Key Configured**: Contact admin to configure API key for tenant
3. **Inactive API Key**: API key exists but is disabled - contact admin
4. **Network Issues**: Check connectivity and DNS resolution

### Validation Steps
```bash
# Check if tenant exists
curl -X GET https://shipyo.it/api/Tenant/getAll | jq '.data.items[] | select(.id == 1)'

# Verify API key works
curl -X GET https://shipyo.it/api/Token/generate-from-apikey \
  -H "x-api-key: retrieved-key"
```
