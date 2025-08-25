---
title: Delete Tenant
description: Soft delete a tenant (marks as deleted)
---

# Delete Tenant 🔒

Soft deletes a tenant (marks as deleted rather than permanently removing).

## Endpoint
**DELETE** `/api/Tenant/delete/{id}`

<HeaderBadge 
  type="jwt" 
  icon="🔒" 
  label="JWT Required"
  :headers="['x-api-key: <your-api-key>', 'Authorization: Bearer <jwt-token>', 'Accept: application/json']"
/>

::: danger Critical Operation
🔒 **JWT Required** + **SuperAdmin Only** - This operation affects all users and data within the tenant
:::

## Request Example
```bash
curl -X DELETE https://shipyo.it/api/Tenant/delete/1 \
  -H "x-api-key: ak_1234567890abcdef" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Accept: application/json"
```

## Path Parameters
- `id` (uint, required): Tenant ID to delete

## Success Response
```json
{
  "success": true,
  "data": null,
  "message": "Tenant with ID 1 deleted successfully"
}
```

## Error Responses

<StatusCode 
  code="400" 
  title="Bad Request"
  description="Request cannot be processed due to business rule violations"
  :example='{"success": false, "message": "Cannot delete tenant with active users", "errors": ["Tenant has 15 active users. Remove or transfer users before deletion."]}'
>

**Business rule violations:**
- Tenant has active users (must be removed/transferred first)
- Tenant has active API keys or integrations
- Tenant already marked as deleted
- Tenant is currently processing transactions
- System tenant cannot be deleted

**Pre-deletion requirements:**
1. Transfer or delete all users in the tenant
2. Deactivate all API keys
3. Cancel active subscriptions/billing
4. Complete pending transactions

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
- Authentication headers malformed

</StatusCode>

<StatusCode 
  code="403" 
  title="Forbidden"
  description="Valid credentials but insufficient permissions for tenant deletion"
  :example='{"success": false, "message": "Forbidden - Insufficient permissions", "errors": ["Only SuperAdmin users can delete tenants"]}'
>

**Permission restrictions:**
- Only SuperAdmin role can delete tenants
- User does not have tenant deletion permissions
- Cross-tenant deletion not allowed
- Tenant deletion temporarily disabled
- User's API key lacks deletion permissions

</StatusCode>

<StatusCode 
  code="404" 
  title="Not Found"
  description="Specified tenant does not exist or is not accessible"
  :example='{"success": false, "message": "Tenant not found", "errors": ["No tenant found with ID 1"]}'
>

**Resource not found:**
- Tenant ID does not exist in the system
- Tenant was previously hard-deleted
- User does not have access to this tenant
- Tenant ID is malformed or invalid

</StatusCode>

<StatusCode 
  code="409" 
  title="Conflict"
  description="Tenant deletion conflicts with current system state"
  :example='{"success": false, "message": "Tenant deletion in progress", "errors": ["Another deletion operation is already in progress for this tenant"]}'
>

**Conflict scenarios:**
- Another deletion operation is already in progress
- Tenant is currently being modified by another user
- Concurrent operations detected
- Resource is locked for maintenance

**Resolution:** Wait for current operation to complete and retry

</StatusCode>

<StatusCode 
  code="422" 
  title="Unprocessable Entity"
  description="Tenant cannot be deleted due to data dependencies or business constraints"
  :example='{"success": false, "message": "Cannot delete master tenant", "errors": ["Master tenant cannot be deleted as it contains system data"]}'
>

**Business constraints:**
- Master/system tenant cannot be deleted
- Tenant contains critical system data
- Legal retention requirements prevent deletion
- Tenant has unresolved billing issues
- Regulatory compliance prevents deletion

</StatusCode>

<StatusCode 
  code="500" 
  title="Internal Server Error"
  description="Unexpected server error during tenant deletion process"
  :example='{"success": false, "message": "Internal server error", "errors": ["Tenant deletion process failed"]}'
>

**System errors:**
- Database connection failure during deletion
- Data cleanup processes failed
- External service dependencies unavailable
- Workflow engine errors

**Client action:** 
- Check if deletion was partially completed
- Retry after a delay
- Contact support for manual intervention

</StatusCode>

## Critical Warnings

### ⚠️ Impact of Tenant Deletion

**This operation affects:**
- All users within the tenant (they lose access)
- All tenant-specific data and configurations  
- All API keys associated with the tenant
- All tenant-specific integrations and settings
- Historical data and reports (may become inaccessible)

### ⚠️ Soft Delete Behavior
- Tenant is marked as deleted, not permanently removed
- Data is preserved for compliance and audit purposes
- Users cannot login or access tenant resources
- Tenant may still appear in some administrative reports
- Deleted tenant ID cannot be reused for new tenants

## Pre-Deletion Checklist

Before deleting a tenant, ensure:

1. **✅ Backup Data**: Export critical tenant data
2. **✅ Notify Users**: Inform all tenant users about the deletion
3. **✅ Transfer Data**: Move important data to other systems if needed
4. **✅ Cancel Integrations**: Disable webhooks, API integrations, etc.
5. **✅ Handle Billing**: Process final billing and cancel subscriptions
6. **✅ Document Reason**: Record why the tenant is being deleted

## Permission Requirements

### SuperAdmin Only
- Only SuperAdmin users can delete tenants
- This prevents accidental or unauthorized tenant deletion
- Requires the highest level of system access

### Multi-Step Verification (Recommended)
Many systems implement additional safeguards:
- Confirmation dialog with tenant name
- Email verification to SuperAdmin
- Audit trail with deletion reason
- Cooling-off period before actual deletion

## Alternative Actions

Consider these alternatives before deletion:

### Temporary Deactivation
```bash
# Use Update Tenant to deactivate instead
curl -X PUT https://shipyo.it/api/Tenant/update \
  -H "x-api-key: your-key" \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "name": "Tenant Name", "isActive": false}'
```

### Data Archival
- Export tenant data before deletion
- Store in archive system for compliance
- Maintain data access for legal requirements

### User Migration
- Transfer users to other tenants
- Preserve user accounts and data
- Maintain service continuity

## Recovery Process

If a tenant was deleted by mistake:

1. **Immediate Action**: Contact system administrator
2. **Data Recovery**: Tenant data may be recoverable from soft delete
3. **Reactivation**: May require database-level operations
4. **Testing**: Verify all tenant functionality after recovery

## Compliance Considerations

- Some industries require data retention periods
- Legal requirements may prevent permanent data deletion
- Audit trails must be maintained for deleted tenants
- Consider GDPR and other privacy regulations

## Monitoring and Alerts

- Tenant deletion should trigger alerts to administrators
- Log all deletion attempts and their outcomes
- Monitor for unauthorized deletion attempts
- Track tenant lifecycle for compliance reporting
