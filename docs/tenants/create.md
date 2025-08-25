---
title: Create Tenant
description: Create a new tenant in the system
---

# Create Tenant 🔒

Creates a new tenant in the system.

## Endpoint
**POST** `/api/Tenant/create`

<HeaderBadge 
  type="jwt" 
  icon="🔒" 
  label="JWT Required"
  :headers="['x-api-key: <your-api-key>', 'Authorization: Bearer <jwt-token>', 'Content-Type: application/json']"
/>

::: warning Authentication Required
🔒 **JWT Required** - Both API key and JWT token are required. Typically requires SuperAdmin privileges.
:::

## Request Example
```bash
curl -X POST https://shipyo.it/api/Tenant/create \
  -H "x-api-key: ak_1234567890abcdef" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Company Tenant",
    "configuration": "initial-tenant-configuration-data"
  }'
```

## Request Body
```json
{
  "name": "New Company Tenant",
  "configuration": "initial-tenant-configuration-data"
}
```

**Fields:**
- `name` (string, required): Human-readable name for the tenant
- `configuration` (string, required): Tenant-specific configuration data

## Success Response
```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "New Company Tenant",
    "configuration": "initial-tenant-configuration-data",
    "isActive": true,
    "createdDate": "2024-08-25T14:30:00Z"
  },
  "message": "Tenant created successfully"
}
```

## Error Responses

### 400 Bad Request - Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name is required",
    "Configuration is required"
  ]
}
```

### 409 Conflict - Name Already Exists
```json
{
  "success": false,
  "message": "Tenant name already exists",
  "errors": ["A tenant with this name already exists"]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Accesso negato: token non valido o mancante",
  "errors": ["JWT token validation failed"]
}
```

### 403 Forbidden - Insufficient Permissions
```json
{
  "success": false,
  "message": "Forbidden - Insufficient permissions",
  "errors": ["Only SuperAdmin users can create tenants"]
}
```

## Permission Requirements

### SuperAdmin Only
- Tenant creation is typically restricted to SuperAdmin users
- This prevents unauthorized tenant proliferation
- Ensures proper tenant management and governance

### Business Considerations
- Each tenant represents a separate organizational entity
- Tenants typically have isolated data and users
- Tenant creation may trigger additional setup processes
- Consider billing and licensing implications

## Post-Creation Steps

After creating a tenant, you typically need to:

1. **Create Admin User**: Set up initial admin user for the tenant
2. **Configure API Keys**: Generate tenant-specific API keys  
3. **Set Permissions**: Configure tenant-specific roles and permissions
4. **Initialize Data**: Set up default data structures
5. **Configure Billing**: Associate with billing/subscription if applicable

## Configuration Format

The `configuration` field format depends on your system implementation. Common examples:

```json
// JSON string format
{
  "configuration": "{\"features\":[\"basic\",\"advanced\"],\"limits\":{\"users\":50,\"storage\":\"5GB\"}}"
}

// Or plain text/XML depending on system design
{
  "configuration": "feature_set=basic;max_users=50;storage_limit=5GB"
}
```

## Usage Notes

- Tenant names should be unique across the system
- Configuration format is system-specific
- New tenants are typically created as active by default
- Consider implementing tenant approval workflows for production systems
- Tenant creation may be logged for audit purposes
