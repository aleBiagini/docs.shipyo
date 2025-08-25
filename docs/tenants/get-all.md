---
title: Get All Tenants
description: Retrieve a paginated list of tenants (access is role-based)
---

# Get All Tenants 🌐

Retrieves a paginated list of tenants. Access is role-based:
- **SuperAdmin:** Can see all tenants
- **Admin:** Can only see their own tenant
- **User:** Cannot see any tenants

## Endpoint
**GET** `/api/Tenant/getAll`

<HeaderBadge 
  type="anonymous" 
  icon="🌐" 
  label="Anonymous"
  :headers="['Accept: application/json']"
/>

::: tip Authentication Type
🌐 **Anonymous** - No API key or JWT token required (but results depend on authentication status)
:::

## Request Example
```bash
curl -X GET "https://shipyo.it/api/Tenant/getAll?page=1&pageSize=10" \
  -H "Accept: application/json"
```

## Query Parameters
- `page` (int, optional): Page number (default: 1)
- `pageSize` (int, optional): Items per page (default: 10)
- `searchTerm` (string, optional): Search term for filtering by tenant name
- `filters` (object, optional): Additional filters

## Success Response
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "name": "Tenant Name",
        "configuration": "tenant-config-data"
      },
      {
        "id": 2,
        "name": "Another Tenant",
        "configuration": "another-config"
      }
    ],
    "totalCount": 2,
    "currentPage": 1,
    "pageSize": 10
  },
  "message": "List retrieved successfully"
}
```

## Access Behavior by Authentication

### Without Authentication (Anonymous)
- May return limited public tenant information
- Typically used for tenant selection during login

### With JWT Token
Results depend on user role:

#### SuperAdmin Users
- Can see all tenants in the system
- Full access to tenant configurations

#### Admin Users  
- Can only see their own tenant
- Limited to tenant they belong to

#### Regular Users
- May see no tenants or very limited information
- Depends on system configuration

## Error Responses

<StatusCode 
  code="403" 
  title="Forbidden"
  description="Insufficient permissions to access tenant information"
  :example='{"success": false, "message": "Forbidden - Insufficient permissions", "errors": ["Access denied"]}'
>

**Access restrictions:**
- User role lacks tenant viewing permissions
- Cross-tenant access denied  
- Anonymous access not allowed for this tenant
- API key lacks tenant listing permissions

</StatusCode>

<StatusCode 
  code="422" 
  title="Unprocessable Entity"
  description="Request parameters violate business rules"
  :example='{"success": false, "message": "Invalid pagination parameters", "errors": ["Page size exceeds maximum limit"]}'
>

**Parameter validation:**
- Page size too large (exceeds maximum)
- Invalid page number
- Search term too short or too long
- Invalid filter parameters

</StatusCode>

<StatusCode 
  code="500" 
  title="Internal Server Error"
  description="Unexpected server error during tenant list retrieval"
  :example='{"success": false, "message": "Internal server error", "errors": ["Database query failed"]}'
>

**System errors:**
- Database connection issues
- Query timeout
- Tenant discovery service unavailable

</StatusCode>

## Usage Notes

- This endpoint is marked as Anonymous but behavior varies by authentication
- Often used in multi-tenant applications for tenant discovery
- SuperAdmin users get full tenant visibility
- Regular users may need to know their tenant ID through other means
- Results are paginated for large tenant lists
- Search functionality available for finding specific tenants by name

## Common Use Cases

1. **Tenant Selection on Login**: Unauthenticated users choosing their tenant
2. **Admin Dashboard**: SuperAdmin viewing all tenants
3. **Tenant Management**: Admin operations within tenant scope
