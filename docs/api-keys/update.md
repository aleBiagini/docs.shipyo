---
title: Update API Key
description: Update an existing API key's information
---

# Update API Key 🔒

Updates an existing API key's information (name, description, IP restrictions, active status).

## Endpoint
**PUT** `/api/ApiKey/update`

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
curl -X PUT https://shipyo.it/api/ApiKey/update \
  -H "x-api-key: ak_1234567890abcdef" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "key": "ak_1234567890abcdef1234567890",
    "name": "Updated Production API Key",
    "allowedIp": "192.168.1.150",
    "isActive": true,
    "description": "Updated description for production API key"
  }'
```

## Request Body
```json
{
  "id": 1,
  "key": "ak_1234567890abcdef1234567890",
  "name": "Updated Production API Key",
  "allowedIp": "192.168.1.150",
  "isActive": true,
  "description": "Updated description for production API key"
}
```

**Fields:**
- `id` (number, required): API Key ID to update
- `key` (string, required): Existing API key value (cannot be changed)
- `name` (string, required): Updated name for the API key
- `allowedIp` (string, optional): Updated IP address restriction (null for no restriction)
- `isActive` (boolean, required): Whether the API key should be active
- `description` (string, optional): Updated description

## Success Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "key": "ak_****...****890",
    "name": "Updated Production API Key",
    "isActive": true,
    "description": "Updated description for production API key",
    "allowedIp": "192.168.1.150",
    "updatedDate": "2024-08-25T16:00:00Z"
  },
  "message": "API Key updated successfully"
}
```

## Error Responses

### 404 Not Found
```json
{
  "success": false,
  "message": "API Key not found",
  "errors": ["No API key found with ID 1"]
}
```

### 400 Bad Request - Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "ID is required",
    "Key is required",
    "Name is required"
  ]
}
```

### 400 Bad Request - Invalid IP Address
```json
{
  "success": false,
  "message": "Invalid IP address",
  "errors": ["allowedIp must be a valid IP address"]
}
```

### 409 Conflict - Name Already Exists
```json
{
  "success": false,
  "message": "API Key name already exists",
  "errors": ["Another API key with this name already exists"]
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
  "errors": ["Cannot update this API key"]
}
```

## What Can Be Updated

### ✅ Updatable Fields
- **Name**: Change the display name
- **Description**: Update the purpose description
- **allowedIp**: Modify IP restrictions
- **isActive**: Enable/disable the key

### ❌ Non-Updatable Fields
- **Key Value**: The actual API key string cannot be changed
- **ID**: The unique identifier is immutable
- **Created Date**: Historical timestamp is preserved

## Common Update Scenarios

### Activate/Deactivate Key
```json
{
  "id": 1,
  "key": "existing-key-value",
  "name": "Current Name",
  "isActive": false,  // Deactivate the key
  "allowedIp": null,
  "description": "Temporarily disabled"
}
```

### Update IP Restriction
```json
{
  "id": 1,
  "key": "existing-key-value", 
  "name": "Current Name",
  "allowedIp": "10.0.0.100",  // New IP restriction
  "isActive": true,
  "description": "Updated for new server IP"
}
```

### Remove IP Restriction
```json
{
  "id": 1,
  "key": "existing-key-value",
  "name": "Current Name", 
  "allowedIp": null,  // Remove IP restriction
  "isActive": true,
  "description": "Removed IP restriction for flexibility"
}
```

## Security Considerations

### Key Value Handling
- Always include the existing key value in update requests
- Key value serves as additional verification
- System may mask the key in responses for security

### IP Address Changes
- Changing `allowedIp` takes effect immediately
- Test connectivity after IP changes
- Consider impact on existing integrations

### Activation Status
- Deactivating a key immediately blocks all API access
- Ensure dependent services have alternative keys
- Monitor for failed requests after deactivation

## Best Practices

### Before Updates
- Document the reason for changes
- Notify users of IP or activation changes
- Have rollback plan for critical keys

### After Updates
- Test API key functionality
- Monitor for authentication errors
- Update documentation and configurations

### Audit Trail
- Updates are typically logged for security
- Track who made changes and when
- Maintain history of key modifications
