---
title: Generate Token from API Key
description: Generate a JWT token based on a validated API key
---

# Generate Token from API Key 🔑

Generates a JWT token based on a validated API key.

## Endpoint
**GET** `/api/Token/generate-from-apikey`

<HeaderBadge 
  type="apikey" 
  icon="🔑" 
  label="API Key Only"
  :headers="['x-api-key: <your-api-key>', 'Accept: application/json']"
/>

::: info Authentication Type
🔑 **API Key Only** - Only API key authentication required
:::

## Request Example
```bash
curl -X GET https://shipyo.it/api/Token/generate-from-apikey \
  -H "x-api-key: ak_1234567890abcdef" \
  -H "Accept: application/json"
```

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
  code="401" 
  title="Unauthorized"
  description="API key is missing from the request headers"
  :example='{"success": false, "message": "API Key is missing.", "errors": ["Missing x-api-key header"]}'
>

**Common scenarios:**
- Missing `x-api-key` header entirely
- Header name misspelled (e.g., `api-key` instead of `x-api-key`)
- Empty or null API key value
- Incorrect header format

</StatusCode>

<StatusCode 
  code="403" 
  title="Forbidden"
  description="API key is invalid or validation failed"
  :example='{"success": false, "message": "Invalid API Key.", "errors": ["API key validation failed"]}'
>

**Common scenarios:**
- API key does not exist in the database
- API key belongs to different tenant
- API key format is invalid
- Wrong API key value provided

</StatusCode>

<StatusCode 
  code="400" 
  title="Bad Request"
  description="API key exists but is not active or has expired"
  :example='{"success": false, "message": "API Key is not active or expired", "errors": ["API key is inactive"]}'
>

**API key status issues:**
- API key is marked as inactive
- API key has expired (if expiration is implemented)
- API key is temporarily suspended
- Tenant associated with API key is inactive

**Resolution:** Contact admin to activate API key

</StatusCode>

<StatusCode 
  code="422" 
  title="Unprocessable Entity"
  description="API key has restrictions that prevent token generation"
  :example='{"success": false, "message": "API key restrictions", "errors": ["IP address not allowed for this API key"]}'
>

**Restriction violations:**
- Request IP address not in API key's allowed IP list
- API key has time-based restrictions
- API key lacks permission for token generation
- Rate limit exceeded for this API key

</StatusCode>

<StatusCode 
  code="500" 
  title="Internal Server Error"
  description="Unexpected server error during token generation from API key"
  :example='{"success": false, "message": "Internal server error", "errors": ["Token generation service unavailable"]}'
>

**System errors:**
- Token signing service unavailable
- Database connection issues
- JWT generation errors

**Client action:** Retry after a brief delay

</StatusCode>

## Usage Notes

- Only `x-api-key` header is required for this endpoint
- The API key must be active and not expired
- The returned JWT token can be used for subsequent authenticated requests
- This is useful for server-to-server authentication flows
