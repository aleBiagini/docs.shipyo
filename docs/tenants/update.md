---
title: Update Tenant
description: Update an existing tenant's information
---

# Update Tenant 🔒

Updates an existing tenant's information.

## Endpoint
**PUT** `/api/Tenant/update`

<HeaderBadge 
  type="jwt" 
  icon="🔒" 
  label="JWT Required"
  :headers="['x-api-key: <your-api-key>', 'Authorization: Bearer <jwt-token>', 'Content-Type: application/json']"
/>

::: warning Authentication Required
🔒 **JWT Required** - Both API key and JWT token are required
:::

## Request Example
```bash
curl -X PUT https://shipyo.it/api/Tenant/update \
  -H "x-api-key: ak_1234567890abcdef" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "name": "Updated Tenant Name",
    "configuration": "updated-configuration-data"
  }'
```

## Request Body
```json
{
  "id": 1,
  "name": "Updated Tenant Name", 
  "configuration": "updated-configuration-data"
}
```

**Fields:**
- `id` (number, required): Tenant ID to update
- `name` (string, required): Updated tenant name
- `configuration` (string, required): Updated tenant configuration

## Success Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Updated Tenant Name",
    "configuration": "updated-configuration-data",
    "isActive": true,
    "updatedDate": "2024-08-25T15:00:00Z"
  },
  "message": "Tenant updated successfully"
}
```

## Error Responses

### 404 Not Found
```json
{
  "success": false,
  "message": "Tenant not found",
  "errors": ["No tenant found with ID 1"]
}
```

### 400 Bad Request - Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "ID is required",
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
  "errors": ["Another tenant with this name already exists"]
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
  "errors": ["Cannot update this tenant"]
}
```

## Access Control

### SuperAdmin Users
- Can update any tenant in the system
- Full access to modify all tenant properties
- No restrictions on tenant modifications

### Admin Users
- Can typically update only their own tenant
- May have restrictions on certain configuration changes
- Access depends on system implementation

### Regular Users
- Usually cannot update tenant information
- May be restricted from this endpoint entirely

## Update Scenarios

### Common Updates
- **Name Changes**: Updating tenant display name
- **Configuration Updates**: Modifying tenant-specific settings
- **Feature Toggles**: Enabling/disabling tenant features
- **Limit Adjustments**: Changing usage limits or quotas

### Configuration Examples
```json
// Feature configuration
{
  "configuration": "{\"features\":[\"advanced\",\"premium\"],\"limits\":{\"users\":100,\"storage\":\"20GB\"}}"
}

// Settings update
{
  "configuration": "max_users=200;storage_limit=50GB;feature_set=enterprise"
}
```

## Important Considerations

### Data Integrity
- Tenant updates may affect all users within the tenant
- Configuration changes can impact tenant functionality
- Consider the impact on existing tenant data

### Validation
- Tenant names must remain unique
- Configuration format must be valid
- Some fields may be immutable depending on system design

### Audit Trail
- Tenant updates are typically logged for compliance
- Track who made changes and when
- Maintain history of configuration changes

## Best Practices

1. **Backup**: Consider backing up current configuration before updates
2. **Validation**: Validate configuration format before applying
3. **Testing**: Test configuration changes in non-production environment
4. **Communication**: Notify tenant users of significant changes
5. **Rollback**: Have a plan to revert changes if issues arise
