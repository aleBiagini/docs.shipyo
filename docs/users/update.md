---
title: Update User
description: Update an existing user's information
---

# Update User 🔒

Updates an existing user's information.

## Endpoint
**PUT** `/api/User/update`

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
curl -X PUT https://shipyo.it/api/User/update \
  -H "x-api-key: ak_1234567890abcdef" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "id": 123,
    "name": "John Doe Updated",
    "email": "john.updated@example.com",
    "street": "456 New Street",
    "zip": "54321",
    "pec": "john.updated.pec@example.com",
    "isCompany": false,
    "isActive": true,
    "sdi": "SDI456",
    "vatCode": "VAT654321",
    "phone": "+1987654321",
    "roleId": 2,
    "municipality": {
      "value": 2
    }
  }'
```

## Request Body
```json
{
  "id": 123,
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "street": "456 New Street",
  "zip": "54321",
  "pec": "john.updated.pec@example.com",
  "isCompany": false,
  "isActive": true,
  "sdi": "SDI456",
  "vatCode": "VAT654321",
  "phone": "+1987654321",
  "roleId": 2,
  "municipality": {
    "value": 2
  }
}
```

**Fields:**
- `id` (number, required): User ID to update
- `name` (string, required): User's full name
- `email` (string, required): User's email address (must be unique)
- `street` (string, required): Street address
- `zip` (string, required): ZIP/postal code
- `pec` (string, optional): PEC (Certified Electronic Mail) address
- `isCompany` (boolean, required): Whether this is a company account
- `isActive` (boolean, required): Whether the user is active
- `sdi` (string, optional): SDI code for Italian invoicing
- `vatCode` (string, optional): VAT identification number
- `phone` (string, optional): Phone number
- `roleId` (number, required): User role (1=SuperAdmin, 2=Admin, 3=User)
- `municipality.value` (number, required): Municipality ID

## Success Response
```json
{
  "success": true,
  "data": {
    "id": 123,
    "name": "John Doe Updated",
    "email": "john.updated@example.com",
    "pec": "john.updated.pec@example.com",
    "isCompany": false,
    "sdi": "SDI456",
    "vatCode": "VAT654321",
    "phone": "+1987654321",
    "roleId": 2,
    "isActive": true,
    "billingAddress": {
      "id": 456,
      "street": "456 New Street",
      "zip": "54321",
      "municipality": {
        "id": 2,
        "name": "Updated City"
      }
    }
  },
  "message": "User updated successfully"
}
```

## Error Responses

<StatusCode 
  code="400" 
  title="Bad Request"
  description="Request contains invalid or missing required data"
  :example='{"success": false, "message": "Validation failed", "errors": ["Email is required", "Name is required", "ID is required"]}'
>

**Validation errors:**
- Missing required fields (`id`, `email`, `name`, etc.)
- Invalid email format
- Invalid role ID (must be 1, 2, or 3)
- Invalid municipality ID
- Malformed phone number or ZIP code
- IP address format issues (if applicable)

</StatusCode>

<StatusCode 
  code="401" 
  title="Unauthorized"
  description="Authentication credentials are missing or invalid"
  :example='{"success": false, "message": "Accesso negato: token non valido o mancante", "errors": ["JWT token validation failed"]}'
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
  description="Valid credentials but insufficient permissions to update users"
  :example='{"success": false, "message": "Forbidden - Insufficient permissions", "errors": ["Cannot update this user"]}'
>

**Permission restrictions:**
- User role lacks permission to update users
- Cross-tenant update denied
- Can only update own profile
- Role escalation not allowed
- API key lacks update permissions

</StatusCode>

<StatusCode 
  code="404" 
  title="Not Found"
  description="User with the specified ID does not exist"
  :example='{"success": false, "message": "User not found", "errors": ["No user found with ID 123"]}'
>

**User not found:**
- User ID does not exist in the system
- User was deleted (soft delete)
- User belongs to different tenant
- User is inactive or archived

</StatusCode>

<StatusCode 
  code="409" 
  title="Conflict"
  description="Email address is already used by another user"
  :example='{"success": false, "message": "Email already exists", "errors": ["Another user with this email already exists"]}'
>

**Conflict scenarios:**
- Email address belongs to another user
- Case-insensitive email collision
- Concurrent update with same email
- Email was recently used by deleted user

**Resolution:** Use a different email address

</StatusCode>

<StatusCode 
  code="422" 
  title="Unprocessable Entity"
  description="Update violates business rules or data constraints"
  :example='{"success": false, "message": "Invalid municipality reference", "errors": ["Municipality ID 999 does not exist"]}'
>

**Business rule violations:**
- Referenced municipality does not exist
- Role change violates tenant policies
- User status change not allowed
- PEC requirements not met for company accounts
- VAT code format invalid for country

</StatusCode>

<StatusCode 
  code="500" 
  title="Internal Server Error"
  description="Unexpected server error during user update"
  :example='{"success": false, "message": "Internal server error", "errors": ["User update failed"]}'
>

**System errors:**
- Database update failure
- Concurrent modification conflicts
- Data integrity constraints

**Client action:** Retry the request or contact support

</StatusCode>

## Usage Notes

- All fields except `id` can be updated
- Email uniqueness is enforced - cannot use an email that belongs to another user
- Role changes may require specific permissions
- Municipality ID must exist in the system
- Users can typically update their own profile, admins can update users in their tenant
- SuperAdmin users can update any user
- Password changes require a separate endpoint or reset flow
