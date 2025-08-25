---
title: Delete API Key
description: Soft delete an API key (marks as deleted)
---

# Delete API Key 🔒

Soft deletes an API key (marks as deleted rather than permanently removing).

## Endpoint
**DELETE** `/api/ApiKey/delete/{id}`

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
curl -X DELETE https://shipyo.it/api/ApiKey/delete/1 \
  -H "x-api-key: ak_1234567890abcdef" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Accept: application/json"
```

## Path Parameters
- `id` (uint, required): API Key ID to delete

## Success Response
```json
{
  "success": true,
  "data": null,
  "message": "API Key with ID 1 deleted successfully"
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

### 400 Bad Request - Cannot Delete Current Key
```json
{
  "success": false,
  "message": "Cannot delete the API key being used for this request",
  "errors": ["You cannot delete the API key you are currently using"]
}
```

### 400 Bad Request - Key Already Deleted
```json
{
  "success": false,
  "message": "API Key already deleted",
  "errors": ["This API key has already been marked as deleted"]
}
```

### 401 Unauthorized - Missing Headers
```json
{
  "success": false,
  "message": "API Key is missing.",
  "errors": ["Missing x-api-key header"]
}
```

### 401 Unauthorized - Invalid JWT
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
  "errors": ["Cannot delete this API key"]
}
```

## Important Notes

### Soft Delete Behavior
- API key is marked as deleted, not permanently removed
- Key is immediately deactivated and cannot be used for API calls
- Key data is preserved for audit and compliance purposes
- Deleted keys may still appear in some administrative reports
- Key ID cannot be reused for new API keys

### Immediate Effect
- **API key stops working immediately** after deletion
- All applications using this key will receive authentication errors
- Dependent services will lose access until updated with new keys

### Self-Protection
- Cannot delete the API key being used for the current request
- Prevents accidental lockout from the API
- Must use a different API key to delete any key

## Pre-Deletion Checklist

Before deleting an API key:

1. **✅ Identify Usage**: Find all applications using this key
2. **✅ Create Replacement**: Generate new API key if needed
3. **✅ Update Applications**: Deploy new key to all dependent services
4. **✅ Test Connectivity**: Verify all services work with new key
5. **✅ Monitor Errors**: Watch for authentication failures
6. **✅ Document Reason**: Record why the key is being deleted

## Permission Requirements

### Access Control
- Users can typically delete API keys within their tenant
- Admin users can delete tenant-scoped API keys
- SuperAdmin users can delete any API key
- Cannot delete keys owned by other tenants (unless SuperAdmin)

### Business Rules
- Some systems may prevent deletion of "master" or "system" keys
- Keys with active integrations may require additional confirmation
- Audit requirements may restrict when keys can be deleted

## Alternative Actions

Consider these alternatives before deletion:

### Temporary Deactivation
```bash
# Use Update API Key to deactivate instead
curl -X PUT https://shipyo.it/api/ApiKey/update \
  -H "x-api-key: different-key" \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "key": "existing-key-value",
    "name": "Key Name",
    "isActive": false
  }'
```

### Key Rotation
Instead of deletion, create a new key and gradually migrate:
1. Create new API key
2. Update applications one by one
3. Monitor for usage of old key
4. Delete old key once usage stops

## Recovery Process

If an API key was deleted by mistake:

1. **Immediate Action**: Generate a new API key immediately
2. **Update Applications**: Deploy new key to affected services
3. **Data Recovery**: Deleted key data may be recoverable from soft delete
4. **Contact Admin**: System administrator may be able to reactivate
5. **Review Process**: Improve key management procedures

## Monitoring After Deletion

After deleting an API key:

- **Monitor Error Logs**: Watch for authentication failures
- **Check Service Health**: Verify all dependent services still work  
- **Track Usage Attempts**: Monitor attempts to use deleted key
- **Update Documentation**: Remove references to deleted key

## Security Best Practices

### Regular Cleanup
- Periodically review and delete unused API keys
- Remove keys for decommissioned applications
- Clean up development and testing keys

### Audit Trail
- API key deletion should be logged for security
- Track who deleted which keys and when
- Maintain records for compliance purposes

### Access Management
- Limit who can delete API keys in production
- Require approval for deletion of critical keys
- Implement multi-factor authentication for key management
