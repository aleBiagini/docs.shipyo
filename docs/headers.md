---
title: HTTP Headers Reference
description: Complete guide to HTTP headers required by ShipYo API
---

# HTTP Headers Reference

This page documents all HTTP headers required for ShipYo API endpoints.

## Overview

The ShipYo API uses multiple authentication mechanisms and requires specific headers depending on the endpoint type.

## Required Headers by Endpoint Type

### 🌐 Anonymous Endpoints
No authentication headers required.

**Required Headers:**
```http
Content-Type: application/json  # For POST/PUT requests only
Accept: application/json        # Recommended
```

### 🔑 API Key Only Endpoints  
Require only API key authentication.

**Required Headers:**
```http
x-api-key: <your-api-key>
Content-Type: application/json  # For POST/PUT requests
Accept: application/json        # Recommended
```

### 🔒 JWT Protected Endpoints
Require both API key and JWT token.

**Required Headers:**
```http
x-api-key: <your-api-key>
Authorization: Bearer <jwt-token>
Content-Type: application/json  # For POST/PUT requests
Accept: application/json        # Recommended
```

## Header Details

### x-api-key
- **Purpose:** Primary authentication mechanism
- **Format:** `x-api-key: <your-api-key>`
- **Required for:** All endpoints except those marked with 🌐
- **Example:** `x-api-key: ak_1234567890abcdef`

### Authorization
- **Purpose:** JWT token for user-specific operations
- **Format:** `Authorization: Bearer <jwt-token>`
- **Required for:** Endpoints marked with 🔒
- **Example:** `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Content-Type
- **Purpose:** Specify request body format
- **Format:** `Content-Type: application/json`
- **Required for:** All POST, PUT, PATCH requests with body
- **Example:** `Content-Type: application/json`

### Accept
- **Purpose:** Specify desired response format
- **Format:** `Accept: application/json`
- **Recommended for:** All requests
- **Example:** `Accept: application/json`

## Quick Reference Table

| Endpoint Category | 🌐 Anonymous | 🔑 API Key | 🔒 JWT Required | Headers Needed |
|------------------|---------------|------------|----------------|----------------|
| User Login | ✅ | ❌ | ❌ | `Content-Type` |
| Password Reset | ✅ | ❌ | ❌ | `Content-Type` |
| Token Generation | ✅ | ❌ | ❌ | `Content-Type` |
| User Management | ❌ | ✅ | ✅ | `x-api-key`, `Authorization`, `Content-Type` |
| Tenant Management | Varies | ✅ | ✅ | See individual endpoints |
| API Key Management | ❌ | ✅ | ✅ | `x-api-key`, `Authorization`, `Content-Type` |
| Webhooks | ✅ | ❌ | ❌ | `Content-Type` |

## Example Requests

### Anonymous Request
```bash
curl -X POST https://shipyo.it/api/User/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### API Key + JWT Request
```bash
curl -X GET https://shipyo.it/api/User/getAll \
  -H "x-api-key: ak_1234567890abcdef" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Accept: application/json"
```

### API Key Only Request
```bash
curl -X GET https://shipyo.it/api/ApiKey/1/apikey \
  -H "x-api-key: ak_1234567890abcdef" \
  -H "Accept: application/json"
```

## Common Errors

### 401 Unauthorized
```json
{
  "success": false,
  "message": "API Key is missing.",
  "errors": ["Missing x-api-key header"]
}
```

**Solution:** Add the `x-api-key` header to your request.

### 403 Forbidden  
```json
{
  "success": false,
  "message": "Invalid API Key.",
  "errors": ["API key validation failed"]
}
```

**Solution:** Check your API key is correct and active.

### 401 JWT Error
```json
{
  "success": false,
  "message": "Accesso negato: token non valido o mancante",
  "errors": ["JWT token validation failed"]
}
```

**Solution:** Add valid JWT token in Authorization header.
