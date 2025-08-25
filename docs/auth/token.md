---
title: Generate JWT Token
description: Generate a JWT token using email and password (alternative login method)
---

# Generate JWT Token 🌐

Generates a JWT token using email and password (alternative login method).

## Endpoint
**POST** `/api/Token/generate`

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
curl -X POST https://shipyo.it/api/Token/generate \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

## Request Body
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Fields:**
- `email` (string, required): User's email address
- `password` (string, required): User's password

## Success Response
```json
{
  "success": true,
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Token generated successfully"
}
```

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
- Malformed email address

</StatusCode>

<StatusCode 
  code="401" 
  title="Unauthorized"
  description="Invalid login credentials provided"
  :example='{"success": false, "message": "Invalid credentials", "errors": ["Invalid email or password"]}'
>

**Common scenarios:**
- Incorrect email or password combination
- User account does not exist
- Account is locked or suspended
- Password has been changed recently

</StatusCode>

<StatusCode 
  code="422" 
  title="Unprocessable Entity"
  description="Account exists but requires password reset before login"
  :example='{"success": false, "message": "Password reset required", "errors": ["Account is inactive and requires password reset"]}'
>

**When this occurs:**
- User account is marked as inactive
- System requires password reset before allowing login
- Account has been flagged for security reasons

**Next steps:** User must complete password reset flow

</StatusCode>

<StatusCode 
  code="500" 
  title="Internal Server Error"
  description="Unexpected server error during token generation"
  :example='{"success": false, "message": "Internal server error", "errors": ["Token generation failed"]}'
>

**Possible causes:**
- Authentication service unavailable
- Token signing service errors
- Database connection issues

**Client action:** Retry after a brief delay

</StatusCode>

## Usage Notes

- This endpoint does not require authentication
- Alternative to the main login endpoint
- Returns only the JWT token (no user details)
- Token should be used for subsequent authenticated requests
- Simpler response format compared to `/api/User/login`
