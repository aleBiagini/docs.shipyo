---
title: HTTP Status Codes Reference
description: Complete reference for all HTTP status codes used by ShipYo API
---

# HTTP Status Codes Reference

This page documents all HTTP status codes used by the ShipYo API with specific meanings and common scenarios.

## Overview

The ShipYo API uses standard HTTP status codes to indicate the success or failure of API requests. Each status code has specific meaning and suggests appropriate client behavior.

## Success Codes (2xx)

### 200 OK
**Meaning:** Request succeeded and data is returned.

**Used for:**
- GET requests that return data
- Successful operations with response body

**Example Response:**
```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed successfully"
}
```

### 201 Created
**Meaning:** Resource was successfully created.

**Used for:**
- POST requests that create new resources
- User creation, tenant creation, API key creation

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "name": "New Resource"
  },
  "message": "Resource created successfully"
}
```

## Client Error Codes (4xx)

### 400 Bad Request
**Meaning:** The request was invalid or cannot be served.

**Common Scenarios:**
- Missing required fields
- Invalid data format
- Business rule violations
- Malformed JSON

**Example Responses:**

#### Missing Required Fields
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Email is required",
    "Password is required"
  ]
}
```

#### Invalid Data Format
```json
{
  "success": false,
  "message": "Invalid request format",
  "errors": [
    "Email must be a valid email address",
    "Password must be at least 6 characters"
  ]
}
```

#### Business Rule Violation
```json
{
  "success": false,
  "message": "Cannot delete your own account",
  "errors": ["Users cannot delete their own account"]
}
```

---

### 401 Unauthorized
**Meaning:** Authentication is required or has failed.

**Common Scenarios:**
- Missing `x-api-key` header
- Invalid API key
- Missing JWT token
- Invalid or expired JWT token
- Malformed Authorization header

**Example Responses:**

#### Missing API Key
```json
{
  "success": false,
  "message": "API Key is missing.",
  "errors": ["Missing x-api-key header"]
}
```

#### Invalid JWT Token
```json
{
  "success": false,
  "message": "Autenticazione fallita",
  "errors": ["Token validation failed"]
}
```

#### Expired Token
```json
{
  "success": false,
  "message": "Accesso negato: token non valido o mancante",
  "errors": ["JWT token has expired"]
}
```

#### Malformed Authorization Header
```json
{
  "success": false,
  "message": "Invalid authorization format",
  "errors": ["Authorization header must start with 'Bearer '"]
}
```

---

### 403 Forbidden
**Meaning:** Server understood the request but refuses to authorize it.

**Common Scenarios:**
- Valid credentials but insufficient permissions
- Role-based access denial
- IP address restrictions
- Tenant access restrictions
- API key is valid but inactive

**Example Responses:**

#### Invalid API Key
```json
{
  "success": false,
  "message": "Invalid API Key.",
  "errors": ["API key validation failed"]
}
```

#### Insufficient Permissions
```json
{
  "success": false,
  "message": "Forbidden - Insufficient permissions",
  "errors": ["Your role does not have access to this resource"]
}
```

#### IP Restriction
```json
{
  "success": false,
  "message": "Access denied from this IP address",
  "errors": ["API key is restricted to specific IP addresses"]
}
```

#### Tenant Access Denial
```json
{
  "success": false,
  "message": "Access denied to tenant resources",
  "errors": ["Cannot access resources from this tenant"]
}
```

---

### 404 Not Found
**Meaning:** The requested resource could not be found.

**Common Scenarios:**
- Invalid endpoint URL
- Resource ID does not exist
- Resource was deleted
- Tenant-scoped resource not accessible

**Example Responses:**

#### Resource Not Found
```json
{
  "success": false,
  "message": "User not found",
  "errors": ["No user found with ID 123"]
}
```

#### Endpoint Not Found
```json
{
  "success": false,
  "message": "Endpoint not found",
  "errors": ["The requested endpoint does not exist"]
}
```

#### Tenant Resource Not Found
```json
{
  "success": false,
  "message": "API Key not configured for tenant",
  "errors": ["No API key has been configured for tenant ID 1"]
}
```

---

### 409 Conflict
**Meaning:** Request conflicts with current state of the resource.

**Common Scenarios:**
- Duplicate resource creation (email, name already exists)
- Concurrent modification conflicts
- State conflicts (trying to activate already active resource)

**Example Responses:**

#### Duplicate Email
```json
{
  "success": false,
  "message": "Email already exists",
  "errors": ["A user with this email already exists"]
}
```

#### Duplicate Name
```json
{
  "success": false,
  "message": "Tenant name already exists",
  "errors": ["A tenant with this name already exists"]
}
```

#### State Conflict
```json
{
  "success": false,
  "message": "Resource already in requested state",
  "errors": ["User is already active"]
}
```

---

### 422 Unprocessable Entity
**Meaning:** Request is well-formed but contains semantic errors.

**Common Scenarios:**
- Complex validation failures
- Business logic violations
- Related resource constraints
- Data integrity issues

**Example Responses:**

#### Complex Validation
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Municipality ID 999 does not exist",
    "Role ID must be between 1 and 3",
    "VAT code format is invalid for this country"
  ]
}
```

#### Business Logic Violation
```json
{
  "success": false,
  "message": "Cannot complete operation",
  "errors": [
    "Cannot delete tenant with active users",
    "Transfer users to another tenant first"
  ]
}
```

#### Data Integrity
```json
{
  "success": false,
  "message": "Data integrity violation",
  "errors": [
    "Referenced municipality does not exist",
    "Parent tenant is required for sub-tenant creation"
  ]
}
```

## Server Error Codes (5xx)

### 500 Internal Server Error
**Meaning:** Server encountered an unexpected condition.

**Common Scenarios:**
- Database connection failures
- Unhandled exceptions
- Configuration errors
- External service failures

**Example Response:**
```json
{
  "success": false,
  "message": "Internal server error",
  "errors": ["An unexpected error occurred. Please try again later."]
}
```

**Client Actions:**
- Retry the request after a delay
- Check system status
- Contact support if persistent

---

## Status Code Quick Reference

| Code | Name | Authentication | Common Cause | Client Action |
|------|------|----------------|--------------|---------------|
| **200** | OK | ✅ Valid | Successful operation | Continue normally |
| **201** | Created | ✅ Valid | Resource created | Use returned resource data |
| **400** | Bad Request | ❓ Any | Invalid request data | Fix request format/data |
| **401** | Unauthorized | ❌ Invalid/Missing | Auth failure | Provide/fix credentials |
| **403** | Forbidden | ✅ Valid | Insufficient permissions | Check role/permissions |
| **404** | Not Found | ❓ Any | Resource doesn't exist | Verify resource ID/URL |
| **409** | Conflict | ✅ Valid | Resource already exists | Use different values |
| **422** | Unprocessable | ✅ Valid | Business rule violation | Fix business logic issues |
| **500** | Server Error | ❓ Any | Server-side error | Retry or contact support |

## Error Response Structure

All error responses follow this standard format:

```json
{
  "success": false,
  "data": null,
  "message": "Human-readable error summary",
  "errors": [
    "Detailed error message 1",
    "Detailed error message 2"
  ]
}
```

### Response Fields

- **success**: Always `false` for errors
- **data**: Always `null` for errors  
- **message**: Primary error message for display to users
- **errors**: Array of detailed error messages for debugging

## Debugging by Status Code

### For 400 Errors
1. Validate request body format (JSON syntax)
2. Check all required fields are present
3. Verify data types and formats
4. Review business rule constraints

### For 401 Errors
1. Verify `x-api-key` header is present and correct
2. Check `Authorization: Bearer <token>` format
3. Confirm JWT token is not expired
4. Test with fresh authentication

### For 403 Errors
1. Verify API key is active and valid
2. Check user role has required permissions
3. Confirm tenant access rights
4. Review IP address restrictions

### For 404 Errors
1. Verify endpoint URL is correct
2. Check resource ID exists
3. Confirm resource is not deleted
4. Verify tenant context

### For 409 Errors
1. Check for duplicate values (email, name)
2. Verify resource doesn't already exist
3. Review current resource state
4. Consider using update instead of create

### For 422 Errors
1. Review complex validation rules
2. Check related resource dependencies
3. Verify business logic constraints
4. Validate foreign key references

### For 500 Errors
1. Retry the request after delay
2. Check API status page
3. Review request for edge cases
4. Contact support with request details

## Best Practices

### Error Handling
- Always check status code before processing response
- Display user-friendly messages from `message` field
- Log detailed errors from `errors` array for debugging
- Implement appropriate retry logic for 500 errors

### Security
- Never expose sensitive information in error messages
- Log security-related errors (401, 403) for monitoring
- Implement rate limiting for repeated error scenarios
- Use generic messages for authentication failures

### Monitoring
- Track error rates by status code
- Monitor for unusual 401/403 patterns (potential attacks)
- Alert on high 500 error rates
- Log error details for debugging
