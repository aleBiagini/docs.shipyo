---
title: Delete User
description: Soft delete a user (marks as deleted)
---

# Delete User 🔒

Soft deletes a user (marks as deleted rather than permanently removing).

## Endpoint
**DELETE** `/api/User/delete/{id}`

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
curl -X DELETE https://shipyo.it/api/User/delete/123 \
  -H "x-api-key: ak_1234567890abcdef" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Accept: application/json"
```

## Path Parameters
- `id` (uint, required): User ID to delete

## Success Response
```json
{
  "success": true,
  "data": null,
  "message": "User with ID 123 deleted successfully"
}
```

## Error Responses

<StatusCode 
  code="400" 
  title="Bad Request"
  description="Request cannot be processed due to business rule violations"
  :example='{"success": false, "message": "Cannot delete your own account", "errors": ["Users cannot delete their own account"]}'
>

**Business rule violations:**
- User attempting to delete their own account
- User already marked as deleted
- User has active sessions or dependencies
- Last admin user in tenant cannot be deleted
- User ID parameter is invalid or malformed

</StatusCode>

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
- Malformed authentication headers

</StatusCode>

<StatusCode 
  code="403" 
  title="Forbidden"
  description="Valid credentials but insufficient permissions to delete users"
  :example='{"success": false, "message": "Forbidden - Insufficient permissions", "errors": ["Cannot delete this user"]}'
>

**Permission restrictions:**
- User role lacks permission to delete users
- Cross-tenant deletion denied
- Cannot delete users with higher privileges
- API key lacks deletion permissions
- Tenant-level restrictions apply

</StatusCode>

<StatusCode 
  code="404" 
  title="Not Found"
  description="User with the specified ID does not exist"
  :example='{"success": false, "message": "User not found", "errors": ["No user found with ID 123"]}'
>

**User not found:**
- User ID does not exist in the system
- User already permanently deleted
- User belongs to different tenant
- User ID is invalid or malformed

</StatusCode>

<StatusCode 
  code="409" 
  title="Conflict"
  description="User deletion conflicts with current system state"
  :example='{"success": false, "message": "User deletion in progress", "errors": ["Another deletion operation is already in progress"]}'
>

**Conflict scenarios:**
- Another deletion operation in progress
- User is currently being modified
- Concurrent operations detected
- User has active sessions that must be terminated first

</StatusCode>

<StatusCode 
  code="422" 
  title="Unprocessable Entity"
  description="User cannot be deleted due to data dependencies"
  :example='{"success": false, "message": "Cannot delete user with active orders", "errors": ["User has 5 active orders that must be transferred first"]}'
>

**Dependency violations:**
- User has active orders or transactions
- User owns critical resources
- User is referenced in audit logs
- Legal retention requirements prevent deletion
- User has API keys that are still active

</StatusCode>

<StatusCode 
  code="500" 
  title="Internal Server Error"
  description="Unexpected server error during user deletion"
  :example='{"success": false, "message": "Internal server error", "errors": ["User deletion process failed"]}'
>

**System errors:**
- Database deletion failure
- Cascade deletion errors
- Session cleanup failures
- External service notification errors

**Client action:** Check if deletion was partially completed, retry, or contact support

</StatusCode>

## Important Notes

### Soft Delete Behavior
- This is a **soft delete** - the user record is not permanently removed
- User is marked as deleted/inactive in the database
- User will no longer be able to login
- User data is preserved for audit and compliance purposes
- Deleted users may still appear in historical reports

### Permission Requirements
- **SuperAdmin**: Can delete any user (except themselves)
- **Admin**: Can delete users within their tenant (except themselves)  
- **User**: Cannot delete any users

### Business Rules
- Users cannot delete their own account (prevents accidental lockout)
- Some systems may prevent deletion of users with active orders/data
- Deleted users may need to be reactivated rather than recreated

### Alternative Actions
If you need to:
- **Temporarily disable**: Use the [Update User](/users/update) endpoint to set `isActive: false`
- **Change permissions**: Use the [Update User](/users/update) endpoint to change `roleId`
- **Transfer ownership**: Contact system administrator

## Recovery
If a user was deleted by mistake:
1. Contact your system administrator
2. User can potentially be reactivated through database operations
3. Consider using the `isActive` flag instead of deletion for temporary restrictions
