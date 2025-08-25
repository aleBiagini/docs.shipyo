---
title: Get All Users
description: Retrieve a paginated list of users with optional filtering
---

# Get All Users 🔒

Retrieves a paginated list of users with optional filtering.

## Endpoint
**GET** `/api/User/getAll`

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
curl -X GET "https://shipyo.it/api/User/getAll?page=1&pageSize=20&searchTerm=john" \
  -H "x-api-key: ak_1234567890abcdef" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Accept: application/json"
```

## Query Parameters
- `page` (int, optional): Page number (default: 1)
- `pageSize` (int, optional): Items per page (default: 10)
- `searchTerm` (string, optional): Search term for filtering
- `filters` (object, optional): Additional filters

## Success Response

<SuccessResponse 
  code="200" 
  title="User List Retrieved Successfully"
  description="Paginated list of users with filtering and search capabilities"
  :example='{
    "success": true,
    "data": {
      "items": [
        {
          "id": 123,
          "name": "John Doe",
          "email": "john@example.com",
          "roleId": 2,
          "roleName": "Admin",
          "isActive": true,
          "isCompany": false,
          "phone": "+1234567890",
          "lastLoginDate": "2024-08-25T14:30:00Z",
          "createdDate": "2024-01-15T10:30:00Z"
        },
        {
          "id": 124,
          "name": "Jane Smith",
          "email": "jane@example.com",
          "roleId": 3,
          "roleName": "User",
          "isActive": true,
          "isCompany": true,
          "phone": "+0987654321",
          "lastLoginDate": "2024-08-24T16:45:00Z",
          "createdDate": "2024-02-01T09:15:00Z"
        }
      ],
      "totalCount": 25,
      "currentPage": 1,
      "pageSize": 20,
      "totalPages": 2,
      "hasNextPage": true,
      "hasPreviousPage": false
    },
    "message": "List retrieved successfully"
  }'
>

### Response Fields

<div class="field-table">

| Field | Type | Description | Notes |
|-------|------|-------------|-------|
| `success` | boolean | Always `true` for successful retrieval | Operation status indicator |
| `data.items` | array | Array of user objects | Limited by pageSize parameter |
| `data.totalCount` | number | Total users matching criteria | Includes all pages |
| `data.currentPage` | number | Current page number | 1-based indexing |
| `data.pageSize` | number | Items per page | As requested or default |
| `data.totalPages` | number | Total number of pages | Calculated field |
| `data.hasNextPage` | boolean | More pages available | Pagination helper |
| `data.hasPreviousPage` | boolean | Previous pages exist | Pagination helper |
| `message` | string | Success confirmation | Human-readable message |

</div>

### User Item Fields

**Each user object in the `items` array contains:**

<div class="field-table">

| Field | Type | Description | Visibility |
|-------|------|-------------|------------|
| `id` | number | Unique user identifier | Always present |
| `name` | string | User's full name | Always present |
| `email` | string | User's email address | Always present |
| `roleId` | number | User role ID | Always present |
| `roleName` | string | Human-readable role name | Always present |
| `isActive` | boolean | Account status | Always present |
| `isCompany` | boolean | Company account flag | Always present |
| `phone` | string/null | Phone number | May be null |
| `lastLoginDate` | string/null | Last login timestamp | May be null if never logged in |
| `createdDate` | string | Account creation date | Always present |

</div>

### Pagination Features

**Navigation helpers:**
- 📄 **Page Count**: `totalPages` calculated automatically
- ⬅️ **Previous Page**: Use `currentPage - 1` if `hasPreviousPage` is true
- ➡️ **Next Page**: Use `currentPage + 1` if `hasNextPage` is true
- 🔢 **Total Records**: `totalCount` shows all matching users

**URL examples for pagination:**
```bash
# First page (default)
GET /api/User/getAll?page=1&pageSize=20

# Next page
GET /api/User/getAll?page=2&pageSize=20

# Custom page size
GET /api/User/getAll?page=1&pageSize=50
```

### Search and Filtering

**Search capabilities:**
- 🔍 **Name Search**: Partial matching on user names
- 📧 **Email Search**: Partial matching on email addresses
- 🏷️ **Role Filtering**: Filter by specific role IDs
- ✅ **Status Filtering**: Filter by active/inactive status

**Search examples:**
```bash
# Search by name
GET /api/User/getAll?searchTerm=john

# Combine search with pagination  
GET /api/User/getAll?searchTerm=admin&page=1&pageSize=10
```

### Access Control Impact

**Results depend on user role:**
- **SuperAdmin**: Can see all users across all tenants
- **Admin**: Can see users within their tenant only
- **User**: Limited visibility based on system configuration

</SuccessResponse>

## Error Responses

<StatusCode 
  code="401" 
  title="Unauthorized"
  description="Authentication credentials are missing or invalid"
  :example='{"success": false, "message": "API Key is missing.", "errors": ["Missing x-api-key header"]}'
>

**Authentication issues:**
- Missing `x-api-key` header
- Invalid API key value
- Missing `Authorization: Bearer <token>` header
- JWT token expired or invalid
- Malformed authentication headers

</StatusCode>

<StatusCode 
  code="403" 
  title="Forbidden"
  description="Valid credentials but insufficient permissions to list users"
  :example='{"success": false, "message": "Invalid API Key.", "errors": ["API key validation failed"]}'
>

**Permission issues:**
- API key validation failed
- User role lacks permission to view users
- Tenant-level access restrictions
- Cross-tenant access denied
- API key lacks user listing permissions

</StatusCode>

<StatusCode 
  code="422" 
  title="Unprocessable Entity"
  description="Request parameters violate business rules or constraints"
  :example='{"success": false, "message": "Invalid pagination parameters", "errors": ["Page size cannot exceed 1000", "Page number must be positive"]}'
>

**Parameter validation:**
- Page size exceeds maximum limit (e.g., 1000)
- Invalid page number (must be positive)
- Search term too short or too long
- Invalid filter parameters
- Conflicting query parameters

</StatusCode>

<StatusCode 
  code="500" 
  title="Internal Server Error"
  description="Unexpected server error during user list retrieval"
  :example='{"success": false, "message": "Internal server error", "errors": ["Database query failed"]}'
>

**System errors:**
- Database connection issues
- Query timeout errors
- Memory limitations for large datasets
- Search index unavailable

**Client action:** Retry with smaller page size or contact support

</StatusCode>

## Usage Notes

- Both `x-api-key` and `Authorization` headers are required
- Results are paginated - use `page` and `pageSize` parameters to navigate
- Use `searchTerm` to filter users by name or email
- Access is role-based - users can only see users within their scope
