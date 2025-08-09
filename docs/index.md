# ShipYo API Reference

This document provides a comprehensive reference for the ShipYo API endpoints covering authentication, user management, tenant management, and API key management.

## Base URL

- `https://shipyo.it`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

Some endpoints also support API key authentication via the `x-api-key` header:
```
x-api-key: <your-api-key>
```

## Response Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Invalid credentials or missing authentication |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource does not exist |
| 500 | Internal Server Error |

## Response Format

All API responses follow a standardized RESTful format. All responses are packed with RESTful status codes. The "success" key serves only as a mere decorator.

**Success Response:**
This format is for responses that are returned with 2xx status codes
```json
{
  "success": true,
  "data": <response-data>,
  "message": "Operation completed successfully",
  "errors": null
}
```

**Error Response:**
This format is for responses that are returned with 4xx and 5xx status codes
```json
{
  "success": false,
  "data": null,
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

---

## Authentication Endpoints

### User Login

**POST** `/api/User/login`

Authenticates a user and returns a JWT token.

**Authorization:** None (Anonymous)

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "tenantId": 1  // Optional: Required for production external origins
}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "defaultTenantId": 1,  // Only present for Admin users
    "user": {
      "email": "user@example.com",
      "roleId": 1,
      "roleName": "Admin"
    },
    "resetUrl": null
  },
  "message": "Login successful"
}
```

**Password Reset Required Response:**
```json
{
  "success": false,
  "data": {
    "token": null,
    "defaultTenantId": null,
    "user": null,
    "resetUrl": "https://localhost:5175/reset-password?token=abc123"
  },
  "message": "User is inactive, password reset required"
}
```

**Error Responses:**
- `400 Bad Request`: Missing email or password
- `401 Unauthorized`: Invalid credentials or missing tenant ID (production)

### Generate JWT Token

**POST** `/api/Token/generate`

Generates a JWT token using email and password (alternative login method).

**Authorization:** None (Anonymous)

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Token generated successfully"
}
```

### Generate Token from API Key

**GET** `/api/Token/generate-from-apikey`

Generates a JWT token based on a validated API key.

**Authorization:** API Key (x-api-key header)

**Headers:**
```
x-api-key: your-api-key
```

**Response:**
```json
{
  "success": true,
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Token generated successfully"
}
```

### Request Password Reset

**POST** `/api/User/request-password-reset`

Sends a password reset link to the user's email.

**Authorization:** None (Anonymous)

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "If the email exists, a password reset link will be sent"
}
```

### Validate Reset Token

**GET** `/api/User/validate-reset-token`

Validates if a password reset token is valid and not expired.

**Authorization:** None (Anonymous)

**Query Parameters:**
- `token` (string, required): The reset token to validate

**Example:** `GET /api/User/validate-reset-token?token=abc123`

**Response:**
```json
{
  "success": true,
  "data": true,
  "message": "Token is valid"
}
```

### Reset Password

**POST** `/api/User/reset-password`

Resets a user's password using a valid reset token.

**Authorization:** None (Anonymous)

**Request Body:**
```json
{
  "token": "reset-token-string",
  "newPassword": "newPassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "Password reset successfully"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid or expired token, password too short (min 6 characters)
- `404 Not Found`: User not found

---

## User Management Endpoints

### Create User

**POST** `/api/User/create`

Creates a new user with auto-generated password sent via email.

**Authorization:** Required (JWT Token)

**Request Body:**
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
  "roleId": 2,  // 1=SuperAdmin, 2=Admin, 3=User
  "municipality": {
    "value": 1  // Municipality ID
  }
}
```

**Response:**
```json
{
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
      "zip": "12345"
    }
  },
  "message": "User created successfully"
}
```

### Get All Users

**GET** `/api/User/getAll`

Retrieves a paginated list of users with optional filtering.

**Authorization:** Required (JWT Token)

**Query Parameters:**
- `page` (int, optional): Page number (default: 1)
- `pageSize` (int, optional): Items per page (default: 10)
- `searchTerm` (string, optional): Search term for filtering
- `filters` (object, optional): Additional filters

**Example:** `GET /api/User/getAll?page=1&pageSize=20&searchTerm=john`

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 123,
        "name": "John Doe",
        "email": "john@example.com",
        "roleId": 2,
        "isActive": true
      }
    ],
    "totalCount": 1,
    "currentPage": 1,
    "pageSize": 20
  },
  "message": "List retrieved successfully"
}
```

### Get User by ID

**GET** `/api/User/getById/{id}`

Retrieves a specific user by their ID.

**Authorization:** Required (JWT Token)

**Path Parameters:**
- `id` (uint, required): User ID

**Response:**
```json
{
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
    "isActive": true
  },
  "message": "User retrieved successfully"
}
```

### Update User

**PUT** `/api/User/update`

Updates an existing user.

**Authorization:** Required (JWT Token)

**Request Body:** Same as Create User, but with `id` field included.

### Delete User

**DELETE** `/api/User/delete/{id}`

Soft deletes a user (marks as deleted).

**Authorization:** Required (JWT Token)

**Path Parameters:**
- `id` (uint, required): User ID

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "User with ID 123 deleted successfully"
}
```

### Check Email Uniqueness

**GET** `/api/User/isEmailUnique/{email}`

Checks if an email address is available for registration.

**Authorization:** Required (JWT Token)

**Path Parameters:**
- `email` (string, required): Email to check

**Response:**
```json
{
  "isUnique": true
}
```

---

## Tenant Management Endpoints

### Get All Tenants

**GET** `/api/Tenant/getAll`

Retrieves a paginated list of tenants. Access is role-based:
- **SuperAdmin:** Can see all tenants
- **Admin:** Can only see their own tenant
- **User:** Cannot see any tenants

**Authorization:** None (Anonymous)

**Query Parameters:**
- `page` (int, optional): Page number (default: 1)
- `pageSize` (int, optional): Items per page (default: 10)
- `searchTerm` (string, optional): Search term for filtering
- `filters` (object, optional): Additional filters

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "name": "Tenant Name",
        "configuration": "tenant-config-data"
      }
    ],
    "totalCount": 1,
    "currentPage": 1,
    "pageSize": 10
  },
  "message": "List retrieved successfully"
}
```

### Get Tenant by ID

**GET** `/api/Tenant/getById/{id}`

Retrieves a specific tenant by ID.

**Authorization:** Required (JWT Token)

**Path Parameters:**
- `id` (uint, required): Tenant ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Tenant Name",
    "configuration": "tenant-config-data"
  },
  "message": "Tenant retrieved successfully"
}
```

### Create Tenant

**POST** `/api/Tenant/create`

Creates a new tenant.

**Authorization:** Required (JWT Token)

**Request Body:**
```json
{
  "name": "New Tenant",
  "configuration": "tenant-configuration-data"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "New Tenant",
    "configuration": "tenant-configuration-data"
  },
  "message": "Tenant created successfully"
}
```

### Update Tenant

**PUT** `/api/Tenant/update`

Updates an existing tenant.

**Authorization:** Required (JWT Token)

**Request Body:**
```json
{
  "id": 1,
  "name": "Updated Tenant Name",
  "configuration": "updated-configuration-data"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Updated Tenant Name",
    "configuration": "updated-configuration-data"
  },
  "message": "Tenant updated successfully"
}
```

### Delete Tenant

**DELETE** `/api/Tenant/delete/{id}`

Soft deletes a tenant (marks as deleted).

**Authorization:** Required (JWT Token)

**Path Parameters:**
- `id` (uint, required): Tenant ID

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "Tenant with ID 1 deleted successfully"
}
```

---

## API Key Management Endpoints

### Get All API Keys

**GET** `/api/ApiKey/getAll`

Retrieves a paginated list of API keys.

**Authorization:** Required (JWT Token)

**Query Parameters:**
- `page` (int, optional): Page number (default: 1)
- `pageSize` (int, optional): Items per page (default: 10)
- `searchTerm` (string, optional): Search term for filtering
- `filters` (object, optional): Additional filters

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "key": "api-key-string",
        "name": "API Key Name",
        "isActive": true,
        "description": "API Key Description",
        "allowedIp": "192.168.1.1"
      }
    ],
    "totalCount": 1,
    "currentPage": 1,
    "pageSize": 10
  },
  "message": "List retrieved successfully"
}
```

### Get API Key by ID

**GET** `/api/ApiKey/getById/{id}`

Retrieves a specific API key by ID.

**Authorization:** Required (JWT Token)

**Path Parameters:**
- `id` (uint, required): API Key ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "key": "api-key-string",
    "name": "API Key Name",
    "isActive": true
  },
  "message": "API Key retrieved successfully"
}
```

### Create API Key

**POST** `/api/ApiKey/create`

Creates a new API key. The key is auto-generated.

**Authorization:** Required (JWT Token)

**Request Body:**
```json
{
  "name": "My API Key",
  "allowedIp": "192.168.1.1",
  "isActive": true,
  "description": "API Key for external integration"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "key": "generated-api-key-string",
    "name": "My API Key",
    "isActive": true
  },
  "message": "API Key created successfully"
}
```

### Update API Key

**PUT** `/api/ApiKey/update`

Updates an existing API key.

**Authorization:** Required (JWT Token)

**Request Body:**
```json
{
  "id": 1,
  "key": "existing-api-key",
  "name": "Updated API Key Name",
  "allowedIp": "192.168.1.100",
  "isActive": false,
  "description": "Updated description"
}
```

### Delete API Key

**DELETE** `/api/ApiKey/delete/{id}`

Soft deletes an API key (marks as deleted).

**Authorization:** Required (JWT Token)

**Path Parameters:**
- `id` (uint, required): API Key ID

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "API Key with ID 1 deleted successfully"
}
```

### Get API Key for Tenant

**GET** `/api/ApiKey/{tenantId}/apikey`

Retrieves the API key associated with a specific tenant.

**Authorization:** None (Anonymous)

**Path Parameters:**
- `tenantId` (long, required): Tenant ID

**Response:**
```json
{
  "success": true,
  "data": {
    "key": "tenant-api-key-string",
    "isActive": true
  },
  "message": "API Key retrieved successfully"
}
```

**Error Responses:**
- `404 Not Found`: API Key not configured for tenant
- `400 Bad Request`: API Key is not active or expired

---



## Rate Limiting

API endpoints may be subject to rate limiting. Check response headers for rate limit information:
- `X-RateLimit-Limit`: Request limit per time window
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time when the rate limit resets

## Security Considerations

1. **HTTPS Only**: All API calls must be made over HTTPS in production
2. **API Key Security**: Store API keys securely and rotate them regularly
3. **JWT Expiration**: JWT tokens have expiration times - implement refresh logic
4. **IP Restrictions**: API keys can be restricted to specific IP addresses
5. **Input Validation**: All input is validated server-side

## Support

For API support or questions, please contact the development team or refer to the project documentation.