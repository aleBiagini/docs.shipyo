---
title: Get API Key by ID
description: Retrieve a specific API key by ID
---

# Get API Key by ID 🔒

Retrieves a specific API key by ID.

## Endpoint
**GET** `/api/ApiKey/getById/{id}`

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
curl -X GET https://shipyo.it/api/ApiKey/getById/1 \
  -H "x-api-key: ak_1234567890abcdef" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Accept: application/json"
```

## Path Parameters
- `id` (uint, required): API Key ID to retrieve

## Success Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "key": "ak_1234567890abcdef1234567890",
    "name": "Production API Key",
    "isActive": true,
    "description": "Main production API key for web application",
    "allowedIp": "192.168.1.100",
    "createdDate": "2024-01-15T10:30:00Z",
    "lastUsed": "2024-08-25T14:30:00Z",
    "permissions": ["read", "write"],
    "expiresAt": null
  },
  "message": "API Key retrieved successfully"
}
```

## Error Responses

### 404 Not Found
```json
{
  "success": false,
  "message": "API Key not found",
  "errors": ["No API key found with ID 1"]
}
```

### 401 Unauthorized - Missing Headers
```json
{
  "success": false,
  "message": "API Key is missing.",
  "errors": ["Missing x-api-key header"]
}
```

### 401 Unauthorized - Invalid JWT
```json
{
  "success": false,
  "message": "Accesso negato: token non valido o mancante",
  "errors": ["JWT token validation failed"]
}
```

### 403 Forbidden - Insufficient Permissions
```json
{
  "success": false,
  "message": "Forbidden - Insufficient permissions",
  "errors": ["Cannot access this API key"]
}
```

## Usage Notes

- Access is tenant-scoped - users can only access API keys within their tenant
- SuperAdmin users can access API keys from all tenants
- Admin users can access API keys within their tenant
- The full API key value may be masked for security purposes
- Use this endpoint to get detailed information about a specific API key including usage statistics
