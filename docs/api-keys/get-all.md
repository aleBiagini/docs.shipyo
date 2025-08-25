---
title: Get All API Keys
description: Retrieve a paginated list of API keys
---

# Get All API Keys 🔒

Retrieves a paginated list of API keys for the current tenant.

## Endpoint
**GET** `/api/ApiKey/getAll`

<HeaderBadge 
  type="jwt" 
  icon="🔒" 
  label="JWT Required"
  :headers="['x-api-key: <your-api-key>', 'Authorization: Bearer <jwt-token>', 'Accept: application/json']"
/>

::: warning Authentication Required
🔒 **JWT Required** - Both API key and JWT token are required
:::

## Request Example
```bash
curl -X GET "https://shipyo.it/api/ApiKey/getAll?page=1&pageSize=10" \
  -H "x-api-key: ak_1234567890abcdef" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Accept: application/json"
```

## Query Parameters
- `page` (int, optional): Page number (default: 1)
- `pageSize` (int, optional): Items per page (default: 10)
- `searchTerm` (string, optional): Search term for filtering by API key name
- `filters` (object, optional): Additional filters

## Success Response
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "key": "ak_1234567890abcdef1234567890",
        "name": "Production API Key",
        "isActive": true,
        "description": "Main production API key for web app",
        "allowedIp": "192.168.1.100",
        "createdDate": "2024-01-15T10:30:00Z",
        "lastUsed": "2024-08-25T14:30:00Z"
      },
      {
        "id": 2,
        "key": "ak_0987654321fedcba0987654321",
        "name": "Development API Key",
        "isActive": true,
        "description": "Development and testing key",
        "allowedIp": null,
        "createdDate": "2024-02-01T09:15:00Z",
        "lastUsed": "2024-08-24T16:45:00Z"
      }
    ],
    "totalCount": 2,
    "currentPage": 1,
    "pageSize": 10
  },
  "message": "List retrieved successfully"
}
```

## Error Responses

<StatusCode 
  code="401" 
  title="Unauthorized"
  description="Authentication credentials are missing or invalid"
  :example='{"success": false, "message": "API Key is missing.", "errors": ["Missing x-api-key header"]}'
>

**Authentication issues:**
- Missing `x-api-key` header
- Invalid API key value
- Missing `Authorization: Bearer <token>` header
- JWT token expired or invalid

</StatusCode>

<StatusCode 
  code="403" 
  title="Forbidden"
  description="Valid credentials but insufficient permissions to view API keys"
  :example='{"success": false, "message": "Forbidden - Insufficient permissions", "errors": ["Cannot view API keys"]}'
>

**Permission restrictions:**
- User role lacks API key viewing permissions
- Cross-tenant API key access denied
- API key lacks permission to list other keys
- Tenant-level restrictions apply

</StatusCode>

<StatusCode 
  code="422" 
  title="Unprocessable Entity"
  description="Request parameters violate constraints"
  :example='{"success": false, "message": "Invalid pagination", "errors": ["Page size exceeds maximum of 100"]}'
>

**Parameter validation:**
- Page size too large
- Invalid page number
- Search term format issues
- Invalid filter parameters

</StatusCode>

<StatusCode 
  code="500" 
  title="Internal Server Error"
  description="Unexpected server error during API key list retrieval"
  :example='{"success": false, "message": "Internal server error", "errors": ["Database query failed"]}'
>

**System errors:**
- Database connection issues
- Query execution problems
- API key service unavailable

</StatusCode>

## Response Fields

### API Key Object
- `id`: Unique API key identifier
- `key`: The actual API key string (may be masked in some implementations)
- `name`: Human-readable name for the API key
- `isActive`: Whether the API key is currently active
- `description`: Optional description of the API key's purpose
- `allowedIp`: IP address restriction (null if no restriction)
- `createdDate`: When the API key was created
- `lastUsed`: When the API key was last used (if tracked)

## Access Control

### SuperAdmin Users
- Can view all API keys across all tenants
- Full visibility into API key usage and configuration

### Admin Users
- Can view API keys within their tenant
- Manage tenant-specific API key access

### Regular Users
- May have limited or no access to API key listings
- Access depends on role permissions and system configuration

## Security Considerations

### Key Exposure
- API keys may be partially masked (e.g., `ak_****...****cdef`)
- Full key values might only be shown once upon creation
- Consider security implications of displaying full keys

### IP Restrictions
- `allowedIp` field shows IP-based access restrictions
- Null value means no IP restriction (access from any IP)
- Use IP restrictions for enhanced security

## Usage Notes

- Results are scoped to the user's tenant context
- Pagination helps manage large numbers of API keys
- Search functionality useful for finding specific keys by name
- Monitor `lastUsed` field to identify unused keys
- Regular audit of API keys recommended for security

## Filtering Examples

```bash
# Search by name
curl -X GET "https://shipyo.it/api/ApiKey/getAll?searchTerm=production" \
  -H "x-api-key: your-key" \
  -H "Authorization: Bearer token"

# Different page size
curl -X GET "https://shipyo.it/api/ApiKey/getAll?pageSize=25" \
  -H "x-api-key: your-key" \
  -H "Authorization: Bearer token"
```
