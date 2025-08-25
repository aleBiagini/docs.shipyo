---
title: Get User by ID
description: Retrieve a specific user by their ID
---

# Get User by ID 🔒

Retrieves a specific user by their ID.

## Endpoint
**GET** `/api/User/getById/{id}`

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
curl -X GET https://shipyo.it/api/User/getById/123 \
  -H "x-api-key: ak_1234567890abcdef" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Accept: application/json"
```

## Path Parameters
- `id` (uint, required): User ID to retrieve

## Success Response
```json
{
  "success": true,
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "pec": "john.pec@example.com",
    "isCompany": false,
    "sdi": "SDI123",
    "vatCode": "VAT123456",
    "phone": "+1234567890",
    "roleId": 2,
    "isActive": true,
    "billingAddress": {
      "id": 456,
      "street": "123 Main St",
      "zip": "12345",
      "municipality": {
        "id": 1,
        "name": "Example City"
      }
    }
  },
  "message": "User retrieved successfully"
}
```

## Error Responses

<StatusCode 
  code="400" 
  title="Bad Request"
  description="User ID parameter is invalid or malformed"
  :example='{"success": false, "message": "Invalid user ID", "errors": ["User ID must be a positive integer"]}'
>

**Parameter validation:**
- User ID is not a number
- User ID is negative or zero
- User ID is not an integer
- Malformed URL path parameter

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
  description="Valid credentials but insufficient permissions to view this user"
  :example='{"success": false, "message": "Forbidden - Insufficient permissions", "errors": ["Access denied for this user"]}'
>

**Permission restrictions:**
- User role lacks permission to view users
- Cross-tenant access denied
- User can only view their own profile
- API key lacks user access permissions
- Tenant-level restrictions apply

</StatusCode>

<StatusCode 
  code="404" 
  title="Not Found"
  description="User with the specified ID does not exist or is not accessible"
  :example='{"success": false, "message": "User not found", "errors": ["No user found with ID 123"]}'
>

**User not found scenarios:**
- User ID does not exist in the system
- User belongs to different tenant (not accessible)
- User was deleted (soft delete)
- User ID exists but user is not active

</StatusCode>

<StatusCode 
  code="500" 
  title="Internal Server Error"
  description="Unexpected server error during user retrieval"
  :example='{"success": false, "message": "Internal server error", "errors": ["Database connection failed"]}'
>

**System errors:**
- Database connection issues
- Query execution errors
- User data corruption

**Client action:** Retry the request or contact support

</StatusCode>

## Usage Notes

- Access is tenant-scoped - users can only access users within their tenant
- SuperAdmin users can access users from all tenants
- Admin users can access users within their tenant
- Regular users may have limited access based on role permissions
- Returns full user details including billing address and municipality information
