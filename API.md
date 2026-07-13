# OPEXNINJA API Documentation

## Overview

RESTful API built with Express.js and TypeScript.

**Base URL:** `https://api.opexninja.com/v1`
**API Version:** 1.0.0
**Authentication:** JWT Bearer Token

## Authentication

Include JWT in Authorization header:
```bash
Authorization: Bearer <your_jwt_token>
```

### Login

**POST** `/auth/login`

```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": 86400
  }
}
```

## Standard Response Format

### Success
```json
{
  "success": true,
  "data": {},
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": [],
    "timestamp": "2026-07-13T10:00:00Z"
  }
}
```

## TODO: Endpoints

### User Endpoints
- GET /users - List users
- POST /users - Create user
- GET /users/:id - Get user
- PUT /users/:id - Update user
- DELETE /users/:id - Delete user

### Expense Endpoints
- GET /expenses - List expenses
- POST /expenses - Create expense
- GET /expenses/:id - Get expense
- PUT /expenses/:id - Update expense
- DELETE /expenses/:id - Delete expense

### Report Endpoints
- GET /reports/summary - Summary report
- GET /reports/by-category - By category
- GET /reports/export - Export CSV/PDF

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| VALIDATION_ERROR | 400 | Input validation failed |
| UNAUTHORIZED | 401 | Authentication required |
| FORBIDDEN | 403 | Access denied |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource conflict |
| RATE_LIMITED | 429 | Too many requests |
| SERVER_ERROR | 500 | Internal error |

## Rate Limiting

- Standard: 100 req/15min
- Auth: 10 req/15min
- Admin: 50 req/15min

Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## Pagination

Query parameters:
- `page` (default: 1)
- `limit` (default: 20, max: 100)
- `sort` (field name)
- `order` (asc/desc)

**Example:**
```bash
GET /expenses?page=2&limit=50&sort=createdAt&order=desc
```

## Support

- Email: api-support@example.com
- Docs: https://docs.opexninja.com
- Status: https://status.opexninja.com
