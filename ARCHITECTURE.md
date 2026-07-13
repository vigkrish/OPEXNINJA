# OPEXNINJA Architecture

## Overview

Full-stack monorepo with:
- Frontend: Next.js (React)
- Backend: Node.js/Express
- Database: PostgreSQL (Prisma ORM)

## Architecture Diagram

```
Clients (Web, Mobile)
         |
    API Gateway
    (rate limit, auth)
         |
  Express REST API
  (Controllers, Services, Repositories)
         |
   Prisma ORM
         |
  PostgreSQL Database

Shared Libraries
- @opexninja/types
- @opexninja/ui
- @opexninja/utils
- @opexninja/config
```

## Tech Stack

### Frontend
- Next.js 14 (React 18)
- TypeScript
- TailwindCSS
- Redux/Zustand
- Jest + React Testing Library
- Playwright (E2E)

### Backend
- Node.js 18+
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Jest + Supertest

### Infrastructure
- Docker (planned)
- Kubernetes (planned)
- GitHub Actions (CI/CD)
- Redis (planned)

## Folder Structure

```
OPEXNINJA/
├── apps/
│   ├── web/          Next.js frontend
│   └── api/          Express backend
├── packages/
│   ├── types/        Shared types
│   ├── ui/           UI components
│   ├── utils/        Utilities
│   └── config/       Configuration
├── database/
│   ├── prisma/
│   └── migrations/
├── docs/             Documentation
├── scripts/          Utility scripts
└── .github/
    └── workflows/    GitHub Actions
```

## Data Flow

```
Client Request
    |
    v
Express Route
    |
    v
Controller (validate)
    |
    v
Service (business logic)
    |
    v
Repository (query DB)
    |
    v
Prisma ORM
    |
    v
PostgreSQL
```

## Authentication

```
User Login
    |
    v
Verify Credentials (bcrypt)
    |
    v
Generate JWT + Refresh Token
    |
    v
Return Tokens
    |
    v
Client Stores Tokens
    |
    v
Include JWT in Headers
    |
    v
Middleware Verifies JWT
    |
    v
Access Protected Routes
```

## Error Response Format

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

## Security Architecture

- JWT-based stateless auth
- RBAC for authorization
- HTTPS/TLS encryption
- Database encryption at rest
- Input sanitization
- CORS configuration
- Rate limiting
- Audit logging

## TODO: Future Enhancements

- GraphQL API
- WebSocket support
- Event-driven architecture
- Microservices
- ML pipeline integration
- Redis caching
- Elasticsearch
