---
title: Password Reset
description: Complete password reset flow - request, validate, and reset password
---

# Password Reset 🌐

Complete password reset flow including request, validation, and password reset.

## Request Password Reset

### Endpoint
**POST** `/api/User/request-password-reset`

<HeaderBadge 
  type="anonymous" 
  icon="🌐" 
  label="Anonymous"
  :headers="['Content-Type: application/json', 'Accept: application/json']"
/>

### Request Example
```bash
curl -X POST https://shipyo.it/api/User/request-password-reset \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

### Request Body
```json
{
  "email": "user@example.com"
}
```

### Response
```json
{
  "success": true,
  "data": null,
  "message": "If the email exists, a password reset link will be sent"
}
```

---

## Validate Reset Token

### Endpoint
**GET** `/api/User/validate-reset-token`

<HeaderBadge 
  type="anonymous" 
  icon="🌐" 
  label="Anonymous"
  :headers="['Accept: application/json']"
/>

### Request Example
```bash
curl -X GET "https://shipyo.it/api/User/validate-reset-token?token=abc123" \
  -H "Accept: application/json"
```

### Query Parameters
- `token` (string, required): The reset token to validate

### Response
```json
{
  "success": true,
  "data": true,
  "message": "Token is valid"
}
```

---

## Reset Password

### Endpoint
**POST** `/api/User/reset-password`

<HeaderBadge 
  type="anonymous" 
  icon="🌐" 
  label="Anonymous"
  :headers="['Content-Type: application/json', 'Accept: application/json']"
/>

### Request Example
```bash
curl -X POST https://shipyo.it/api/User/reset-password \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "token": "reset-token-string",
    "newPassword": "newPassword123"
  }'
```

### Request Body
```json
{
  "token": "reset-token-string",
  "newPassword": "newPassword123"
}
```

**Fields:**
- `token` (string, required): Valid reset token received via email
- `newPassword` (string, required): New password (minimum 6 characters)

### Success Response
```json
{
  "success": true,
  "data": null,
  "message": "Password reset successfully"
}
```

### Error Responses

<StatusCode 
  code="400" 
  title="Bad Request"
  description="Reset token is invalid, expired, or password validation failed"
  :example='{"success": false, "message": "Invalid or expired token", "errors": ["Reset token is invalid or expired"]}'
>

**Token issues:**
- Reset token has expired (tokens have limited lifetime)
- Token is malformed or corrupted
- Token has already been used
- Token does not exist in system

**Password validation issues:**
- Password too short (minimum 6 characters required)
- Password does not meet complexity requirements
- Password is the same as current password

</StatusCode>

<StatusCode 
  code="404" 
  title="Not Found"
  description="User associated with the reset token cannot be found"
  :example='{"success": false, "message": "User not found", "errors": ["No user associated with this token"]}'
>

**User not found scenarios:**
- User account was deleted after token generation
- Token belongs to non-existent user
- User was transferred to different tenant
- Database integrity issues

</StatusCode>

<StatusCode 
  code="422" 
  title="Unprocessable Entity"
  description="Password reset violates business rules or security policies"
  :example='{"success": false, "message": "Password reset not allowed", "errors": ["Account is locked and cannot reset password"]}'
>

**Business rule violations:**
- User account is permanently locked
- Too many recent password reset attempts
- Account requires administrator intervention
- Password reset disabled for this user type

</StatusCode>

<StatusCode 
  code="500" 
  title="Internal Server Error"
  description="Unexpected server error during password reset process"
  :example='{"success": false, "message": "Internal server error", "errors": ["Password reset failed due to system error"]}'
>

**System errors:**
- Database update failures
- Password hashing service errors
- Email notification service issues

**Client action:** Retry the request or contact support

</StatusCode>

## Complete Flow Example

```bash
# 1. Request password reset
curl -X POST https://shipyo.it/api/User/request-password-reset \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'

# 2. User receives email with reset link containing token
# Example: https://yourapp.com/reset?token=abc123

# 3. Validate token (optional)
curl -X GET "https://shipyo.it/api/User/validate-reset-token?token=abc123"

# 4. Reset password with token
curl -X POST https://shipyo.it/api/User/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "abc123",
    "newPassword": "newSecurePassword123"
  }'
```

## Usage Notes

- All password reset endpoints are anonymous (no authentication required)
- Reset tokens have limited lifetime (check with admin for expiration time)
- For security, the system always returns success even if email doesn't exist
- Minimum password length is 6 characters
- After successful password reset, user can login with new password
