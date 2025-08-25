---
title: Create User
description: Create a new user with auto-generated password sent via email
---

# Create User 🔒

Creates a new user with auto-generated password sent via email.

## Endpoint
**POST** `/api/User/create`

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
curl -X POST https://shipyo.it/api/User/create \
  -H "x-api-key: ak_1234567890abcdef" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "street": "123 Main St",
    "zip": "12345",
    "pec": "john.pec@example.com",
    "isCompany": false,
    "isActive": true,
    "sdi": "SDI123",
    "vatCode": "VAT123456",
    "phone": "+1234567890",
    "roleId": 2,
    "municipality": {
      "value": 1
    }
  }'
```

## Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "street": "123 Main St",
  "zip": "12345",
  "pec": "john.pec@example.com",
  "isCompany": false,
  "isActive": true,
  "sdi": "SDI123",
  "vatCode": "VAT123456",
  "phone": "+1234567890",
  "roleId": 2,
  "municipality": {
    "value": 1
  }
}
```

**Fields:**
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

<SuccessResponse 
  code="201" 
  title="User Created Successfully"
  description="New user has been created with auto-generated password sent via email"
  :example='{
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
      },
      "createdDate": "2024-08-25T15:30:00Z"
    },
    "message": "User created successfully"
  }'
>

### Response Fields

<div class="field-table">

| Field | Type | Description | Notes |
|-------|------|-------------|-------|
| `success` | boolean | Always `true` for successful creation | Indicates operation success |
| `data.id` | number | Unique user identifier | Use for subsequent user operations |
| `data.name` | string | User's full name | As provided in request |
| `data.email` | string | User's email address | Login credential and contact |
| `data.pec` | string/null | PEC (Certified Electronic Mail) | Italian business email |
| `data.isCompany` | boolean | Company account flag | Affects business rules |
| `data.sdi` | string/null | SDI code | Italian invoicing system code |
| `data.vatCode` | string/null | VAT identification number | Tax identification |
| `data.phone` | string/null | Phone number | Contact information |
| `data.roleId` | number | User role ID | 1=SuperAdmin, 2=Admin, 3=User |
| `data.isActive` | boolean | Account activation status | User can login if true |
| `data.billingAddress.id` | number | Billing address unique ID | For address management |
| `data.billingAddress.street` | string | Street address | Physical address |
| `data.billingAddress.zip` | string | ZIP/postal code | Address validation |
| `data.billingAddress.municipality` | object | Municipality information | Geographic reference |
| `data.createdDate` | string | ISO timestamp of creation | For audit and tracking |
| `message` | string | Success confirmation | Human-readable message |

</div>

### Post-Creation Actions

**Automatic processes triggered:**
- 🔑 **Password Generation**: Random secure password created
- 📧 **Email Notification**: Welcome email sent with login credentials  
- 👤 **Profile Setup**: User profile initialized with provided data
- 🏢 **Tenant Association**: User linked to current tenant context
- 📝 **Audit Log**: User creation event recorded

### Important Notes
- **Password**: Auto-generated password is sent via email - user should change on first login
- **Activation**: User account is immediately active and can login
- **Permissions**: Role-based permissions apply immediately
- **Billing Address**: Automatically created and linked to user account
- **Municipality**: Must exist in system - validates geographic data

### Next Steps
1. **User receives email** with temporary password
2. **User logs in** with email and temporary password  
3. **System may prompt** for password change on first login
4. **User can access** system based on assigned role permissions

</SuccessResponse>

## Error Responses

<StatusCode 
  code="400" 
  title="Bad Request"
  description="Request contains invalid or missing required data"
  :example='{"success": false, "message": "Validation failed", "errors": ["Email is required", "Name is required", "RoleId must be between 1 and 3"]}'
>

**Common validation errors:**
- Missing required fields (`email`, `name`, `roleId`, etc.)
- Invalid email format
- Invalid role ID (must be 1, 2, or 3)
- Invalid municipality ID
- Phone number format issues
- ZIP code validation failures

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
- Missing `Authorization` header
- Invalid or expired JWT token
- Malformed Bearer token format

</StatusCode>

<StatusCode 
  code="403" 
  title="Forbidden"
  description="Valid credentials but insufficient permissions to create users"
  :example='{"success": false, "message": "Forbidden - Insufficient permissions", "errors": ["Your role does not allow user creation"]}'
>

**Permission issues:**
- User role lacks permission to create users
- Tenant-level restrictions apply
- API key does not have user creation permissions
- Cross-tenant access denied

</StatusCode>

<StatusCode 
  code="409" 
  title="Conflict"
  description="User with the same email already exists in the system"
  :example='{"success": false, "message": "Email already exists", "errors": ["A user with this email already exists"]}'
>

**Conflict scenarios:**
- Email address is already registered to another user
- Duplicate user creation attempt
- Concurrent user registration with same email

**Resolution:** Use a different email address or update the existing user

</StatusCode>

<StatusCode 
  code="422" 
  title="Unprocessable Entity"
  description="Request is valid but violates business rules or data constraints"
  :example='{"success": false, "message": "Invalid municipality reference", "errors": ["Municipality ID 999 does not exist"]}'
>

**Business rule violations:**
- Referenced municipality does not exist
- Invalid combination of fields (e.g., company settings with personal data)
- PEC required for company accounts in certain regions
- VAT code format invalid for specified country
- Role assignment violates tenant policies

</StatusCode>

<StatusCode 
  code="500" 
  title="Internal Server Error"
  description="Unexpected server error during user creation"
  :example='{"success": false, "message": "Internal server error", "errors": ["User creation failed due to system error"]}'
>

**Possible causes:**
- Database connection failure
- Email service unavailable (for password generation)
- User creation workflow errors
- External service dependencies failed

**Client action:** Retry the request or contact support

</StatusCode>

## Role IDs

| Role ID | Role Name | Description |
|---------|-----------|-------------|
| 1 | SuperAdmin | Full system access |
| 2 | Admin | Tenant-level administration |
| 3 | User | Limited read/write access |

## Usage Notes

- Password is automatically generated and sent to the user's email
- User will need to login and may be prompted to change password
- Email uniqueness is enforced across the system
- Municipality ID must exist in the system
- Created user inherits tenant context from the creating user's JWT token
- PEC field is commonly used in Italian business contexts
