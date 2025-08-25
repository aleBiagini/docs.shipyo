---
title: Authentication Troubleshooting
description: Complete guide to resolve common 401/403 authentication errors in ShipYo API
---

# Authentication Troubleshooting

This guide helps you resolve common authentication errors when using the ShipYo API.

## Quick Error Reference

| Error Code | Common Cause | Quick Fix |
|------------|-------------|-----------|
| `401` | Missing `x-api-key` header | Add `x-api-key: <your-key>` header |
| `401` | Missing JWT token | Add `Authorization: Bearer <token>` header |
| `403` | Invalid API key | Check API key value and activation status |
| `403` | Expired JWT token | Generate new token via `/api/Token/generate` |
| `403` | IP restriction | Contact admin to whitelist your IP |

## 401 Unauthorized Errors

### Error: "API Key is missing"

<ErrorCard 
  code="401" 
  type="unauthorized"
  title="API Key Missing"
  :response='{"success": false, "message": "API Key is missing.", "errors": null}'
  cause="The x-api-key header is not present in your request"
>

Add the missing header:
```bash
# ❌ Wrong - Missing header
curl -X GET https://shipyo.it/api/User/getAll

# ✅ Correct - With API key
curl -X GET https://shipyo.it/api/User/getAll \
  -H "x-api-key: your-api-key-here"
```

</ErrorCard>

**Affected Endpoints:** All endpoints except:
- `/hangfire/*`
- `/hc`
- `/api/apikey/create`
- Endpoints with `[AllowAnonymous]` attribute

---

### Error: "Autenticazione fallita"

**Response:**
```json
{
  "success": false,
  "message": "Autenticazione fallita",
  "error": "Token validation failed"
}
```

**Cause:** JWT token is missing, malformed, or invalid.

**Solutions:**

1. **Missing Authorization Header:**
```bash
# ❌ Wrong - Missing JWT
curl -X GET https://shipyo.it/api/User/getAll \
  -H "x-api-key: your-api-key"

# ✅ Correct - With JWT
curl -X GET https://shipyo.it/api/User/getAll \
  -H "x-api-key: your-api-key" \
  -H "Authorization: Bearer your-jwt-token"
```

2. **Malformed Token:**
```bash
# ❌ Wrong - Missing "Bearer" prefix
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ✅ Correct - With "Bearer" prefix  
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Generate New Token:**
```bash
curl -X POST https://shipyo.it/api/Token/generate \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-email@example.com",
    "password": "your-password"
  }'
```

---

### Error: "Accesso negato: token non valido o mancante"

**Response:**
```json
{
  "success": false,
  "message": "Accesso negato: token non valido o mancante"
}
```

**Cause:** JWT token validation failed during challenge phase.

**Solutions:**

1. **Check Token Expiration:**
   - JWT tokens have limited lifetime
   - Generate a new token if expired

2. **Verify Token Format:**
   - Must start with `Bearer `
   - Token should be a valid JWT string

3. **Check Environment:**
   - Ensure `JWT_SECRET_KEY` environment variable matches

---

## 403 Forbidden Errors

### Error: "Invalid API Key"

<ErrorCard 
  code="403" 
  type="forbidden"
  title="Invalid API Key"
  :response='{"success": false, "message": "Invalid API Key.", "errors": null}'
  cause="The provided API key is not found in database, inactive, or contains invalid characters"
>

**Common causes and solutions:**

1. **API Key Not Found in Database:**
   ```bash
   # Check if your API key exists
   curl -X GET https://shipyo.it/api/ApiKey/getAll \
     -H "Authorization: Bearer admin-jwt-token" \
     -H "x-api-key: admin-api-key"
   ```

2. **API Key Inactive:**
   ```json
   // Check isActive field in API key response
   {
     "id": 1,
     "key": "your-key",
     "isActive": false  // ← Problem here
   }
   ```
   **Solution:** Contact admin to activate your API key.

3. **Wrong API Key Value:**
   - Double-check the API key string
   - Ensure no extra spaces or characters

</ErrorCard>

---

### Error: "Insufficient permissions"

**Response:**
```json
{
  "success": false,
  "message": "Forbidden - Insufficient permissions",
  "errors": ["Role mismatch"]
}
```

**Cause:** Your user role doesn't have access to the endpoint.

**Role Permissions:**
- **SuperAdmin (1):** Access to all endpoints
- **Admin (2):** Tenant-scoped access
- **User (3):** Limited read access

**Solution:** Contact admin to upgrade your role or use appropriate endpoints for your role.

---

## IP Restriction Issues

### Error: API key works locally but fails in production

**Symptoms:**
- ✅ Works from your development machine
- ❌ Fails from server/production environment

**Cause:** API key has `allowedIp` restriction.

**Check IP Restriction:**
```bash
# Get your API key details
curl -X GET https://shipyo.it/api/ApiKey/getById/1 \
  -H "Authorization: Bearer admin-token" \
  -H "x-api-key: admin-key"
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "allowedIp": "192.168.1.100"  // ← Your IP must match this
  }
}
```

**Solutions:**
1. Update API key to allow your current IP
2. Remove IP restriction (set `allowedIp` to null)
3. Use a different API key without IP restrictions

---

## Tenant Context Issues

### Error: "Tenant not found" or empty results

**Cause:** API calls are tenant-scoped, but wrong tenant context.

**Solution:** Ensure your JWT token contains correct `TenantId` claim:

```bash
# Login with specific tenant
curl -X POST https://shipyo.it/api/User/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "tenantId": 1  // ← Specify tenant
  }'
```

---

## Debugging Steps

### 1. Verify Headers
```bash
# Test with verbose output to see headers
curl -v -X GET https://shipyo.it/api/User/getAll \
  -H "x-api-key: your-key" \
  -H "Authorization: Bearer your-token"
```

### 2. Check API Key Status
```bash
# Verify API key details
curl -X GET https://shipyo.it/api/ApiKey/{tenantId}/apikey
```

### 3. Test JWT Token
```bash
# Generate fresh token
curl -X POST https://shipyo.it/api/Token/generate \
  -H "x-api-key: your-key" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'
```

### 4. Validate Token from API Key
```bash
# Alternative token generation
curl -X GET https://shipyo.it/api/Token/generate-from-apikey \
  -H "x-api-key: your-key"
```

---

## Special Cases

### Anonymous Endpoints
These endpoints **don't require** `x-api-key` header:

**✅ Always Anonymous:**
- `/hangfire/*` - Hangfire dashboard
- `/hc` - Health check
- `/api/apikey/create` - API key creation

**✅ Anonymous with [AllowAnonymous]:**
- `POST /api/User/login`
- `POST /api/User/register` 
- `POST /api/User/request-password-reset`
- `GET /api/User/validate-reset-token`
- `POST /api/User/reset-password`
- `GET /api/Tenant/getAll`
- `POST /api/Token/generate`
- `GET /api/PaymentToken/validate`
- `GET /api/ApiKey/{tenantId}/apikey`
- Webhook endpoints

### Regex Pattern Exceptions
The tenant API key endpoint follows this pattern and is **excluded** from API key validation:
```
/api/tenants/\d+/apikey
```

---

## Testing Your Setup

### Complete Test Flow
```bash
# 1. Test anonymous endpoint (should work without headers)
curl -X GET https://shipyo.it/hc

# 2. Test with API key only
curl -X GET https://shipyo.it/api/ApiKey/1/apikey \
  -H "x-api-key: your-key"

# 3. Test with both API key and JWT
curl -X GET https://shipyo.it/api/User/getAll \
  -H "x-api-key: your-key" \
  -H "Authorization: Bearer your-token"
```

### Expected Responses
```bash
# Health check - Should return 200
{"status": "Healthy"}

# API key test - Should return key details
{"success": true, "data": {"key": "...", "isActive": true}}

# Full auth test - Should return user list
{"success": true, "data": {"items": [...], "totalCount": 10}}
```

---

## Contact Support

If you continue experiencing issues after following this guide:

1. **Check API Status:** Verify the API is running at `https://shipyo.it`
2. **Review Logs:** Check your application logs for detailed error messages
3. **Contact Admin:** Reach out to your system administrator for:
   - API key activation
   - Role permission updates  
   - IP whitelist modifications
   - Tenant access issues

---

## Error Code Reference

| HTTP Status | API Response | Meaning | Action Required |
|-------------|--------------|---------|-----------------|
| `401` | "API Key is missing" | No `x-api-key` header | Add API key header |
| `401` | "Autenticazione fallita" | Invalid/missing JWT | Fix Authorization header |
| `401` | "Accesso negato" | JWT validation failed | Generate new token |
| `403` | "Invalid API Key" | API key validation failed | Check key value/status |
| `403` | "Insufficient permissions" | Role access denied | Contact admin |
| `404` | "API Key not configured" | Tenant has no API key | Contact admin |
| `400` | "API Key not active" | Key exists but inactive | Contact admin |
