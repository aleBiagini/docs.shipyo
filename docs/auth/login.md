---
title: User Login
description: Authenticate a user and return JWT token
---

# User Login 🌐

Authenticates a user and returns a JWT token.

## Endpoint
**POST** `/api/User/login`

<HeaderBadge 
  type="anonymous" 
  icon="🌐" 
  label="Anonymous"
  :headers="['Content-Type: application/json', 'Accept: application/json']"
/>

::: tip Authentication Type
🌐 **Anonymous** - No API key or JWT token required
:::

## Request Example
```bash
curl -X POST https://shipyo.it/api/User/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "tenantId": 1
  }'
```

## Request Body
```json
{
  "email": "user@example.com",
  "password": "password123",
  "tenantId": 1  // Optional: Required for production external origins
}
```

**Fields:**
- `email` (string, required): User's email address
- `password` (string, required): User's password
- `tenantId` (number, optional): Tenant ID, required for production external origins

## Success Response

<SuccessResponse 
  code="200" 
  title="Login Successful"
  description="User authentication succeeded and JWT token has been generated"
  :example='{
    "success": true,
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "defaultTenantId": 1,
      "user": {
        "email": "user@example.com",
        "roleId": 1,
        "roleName": "Admin"
      },
      "resetUrl": null
    },
    "message": "Login successful"
  }'
>

### Response Fields

<div class="field-table">

| Field | Type | Description | Notes |
|-------|------|-------------|-------|
| `success` | boolean | Always `true` for successful login | Used for client-side validation |
| `data.token` | string | JWT authentication token | Use for subsequent API calls |
| `data.defaultTenantId` | number/null | Default tenant ID for user | Only present for Admin users |
| `data.user.email` | string | User's email address | Matches login email |
| `data.user.roleId` | number | User's role ID | 1=SuperAdmin, 2=Admin, 3=User |
| `data.user.roleName` | string | Human-readable role name | For display purposes |
| `data.resetUrl` | null | Password reset URL | Always null on successful login |
| `message` | string | Success message | Human-readable confirmation |

</div>

### Important Notes
- **JWT Token**: Store securely and include in `Authorization: Bearer <token>` header
- **Token Expiration**: JWT tokens have limited lifetime - implement refresh logic
- **Tenant Context**: `defaultTenantId` determines user's primary tenant scope
- **Role-Based Access**: `roleId` determines API endpoint permissions

</SuccessResponse>

## Password Reset Required Response

<SuccessResponse 
  code="422" 
  title="Password Reset Required"
  description="User exists but account is inactive and requires password reset"
  :example='{
    "success": false,
    "data": {
      "token": null,
      "defaultTenantId": null,
      "user": null,
      "resetUrl": "https://localhost:5175/reset-password?token=abc123"
    },
    "message": "User is inactive, password reset required"
  }'
>

### Response Fields

| Field | Type | Description | Action Required |
|-------|------|-------------|-----------------|
| `success` | boolean | `false` - indicates login failed | Check for password reset flow |
| `data.token` | null | No token provided | Cannot proceed with API calls |
| `data.resetUrl` | string | Password reset link with token | Direct user to this URL |
| `message` | string | Reason for login failure | Display to user |

### Next Steps
1. **Redirect user** to the provided `resetUrl`
2. **User completes** password reset process
3. **User can login** with new password
4. **System activates** account after successful reset

</SuccessResponse>

## Error Responses

<StatusCode 
  code="400" 
  title="Bad Request"
  description="Request is missing required fields or contains invalid data"
  :example='{"success": false, "message": "Validation failed", "errors": ["Email is required", "Password is required"]}'
>

**Common scenarios:**
- Missing `email` or `password` fields
- Empty or null values in required fields
- Invalid JSON format in request body

</StatusCode>

<StatusCode 
  code="401" 
  title="Unauthorized"
  description="Invalid login credentials or missing tenant ID for production environments"
  :example='{"success": false, "message": "Invalid credentials", "errors": ["Invalid email or password"]}'
>

**Common scenarios:**
- Incorrect email or password combination
- User account does not exist
- Missing `tenantId` for production external origins
- Account is locked or suspended

</StatusCode>

<StatusCode 
  code="422" 
  title="Unprocessable Entity"
  description="Password reset is required before login can proceed"
  :example='{"success": false, "data": {"resetUrl": "https://localhost:5175/reset-password?token=abc123"}, "message": "User is inactive, password reset required"}'
>

**When this occurs:**
- User account is marked as inactive
- System requires password reset before allowing login
- User must complete password reset flow before proceeding

**Next steps:**
1. User receives reset URL in response
2. User follows reset link to set new password
3. User can then login with new credentials

</StatusCode>

<StatusCode 
  code="500" 
  title="Internal Server Error"
  description="Unexpected server error during authentication process"
  :example='{"success": false, "message": "Internal server error", "errors": ["An unexpected error occurred"]}'
>

**When this occurs:**
- Database connection issues
- Authentication service unavailable
- Unexpected server-side errors

**Client action:** Retry after a brief delay or contact support

</StatusCode>

## Usage Notes

- This endpoint does not require authentication
- For production environments with external origins, `tenantId` is required
- If the user account is inactive, a password reset URL will be provided
- The returned JWT token should be used for subsequent authenticated requests
- Admin users receive a `defaultTenantId` in the response
