---
title: Get Tenant by ID
description: Retrieve a specific tenant by ID
---

# Get Tenant by ID 🔒

Retrieves a specific tenant by ID.

## Endpoint
**GET** `/api/Tenant/getById/{id}`

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
curl -X GET https://shipyo.it/api/Tenant/getById/1 \
  -H "x-api-key: ak_1234567890abcdef" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Accept: application/json"
```

## Path Parameters
- `id` (uint, required): Tenant ID to retrieve

## Success Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Example Tenant",
    "configuration": "detailed-tenant-configuration-data",
    "isActive": true,
    "createdDate": "2024-01-15T10:30:00Z",
    "settings": {
      "features": ["feature1", "feature2"],
      "limits": {
        "users": 100,
        "storage": "10GB"
      }
    }
  },
  "message": "Tenant retrieved successfully"
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
  description="Valid credentials but insufficient permissions to access tenant"
  :example='{"success": false, "message": "Forbidden - Insufficient permissions", "errors": ["Cannot access this tenant"]}'
>

**Permission restrictions:**
- User role lacks tenant access permissions
- Cross-tenant access denied
- API key restricted from tenant information
- Admin users limited to own tenant

</StatusCode>

<StatusCode 
  code="404" 
  title="Not Found"
  description="Tenant with specified ID does not exist or is not accessible"
  :example='{"success": false, "message": "Tenant not found", "errors": ["No tenant found with ID 1"]}'
>

**Tenant not found:**
- Tenant ID does not exist
- Tenant belongs to different scope
- Tenant is inactive or archived
- Invalid tenant ID format

</StatusCode>

<StatusCode 
  code="500" 
  title="Internal Server Error"
  description="Unexpected server error during tenant retrieval"
  :example='{"success": false, "message": "Internal server error", "errors": ["Database connection failed"]}'
>

**System errors:**
- Database connection issues
- Tenant data corruption
- Configuration service unavailable

</StatusCode>

## Access Control

### SuperAdmin Users
- Can retrieve any tenant by ID
- Get full configuration details
- No restrictions on tenant access

### Admin Users
- Can only retrieve their own tenant
- Attempting to access other tenants results in 403 Forbidden
- Get full details for their tenant

### Regular Users  
- May have limited or no access to tenant details
- Depends on system configuration and permissions

## Usage Notes

- Access is strictly controlled by user role and tenant association
- SuperAdmin users have unrestricted access
- Admin users are limited to their own tenant context
- Tenant configuration may contain sensitive information
- Useful for tenant-specific settings and feature management
- Configuration format depends on your tenant implementation

## Response Fields

- `id`: Unique tenant identifier
- `name`: Human-readable tenant name
- `configuration`: Tenant-specific configuration data (format varies)
- `isActive`: Whether the tenant is currently active
- `createdDate`: When the tenant was created
- `settings`: Additional tenant settings and limits (structure varies)
