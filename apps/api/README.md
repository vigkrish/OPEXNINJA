# OPEX Ninja - Backend API

Express.js REST API built with TypeScript, Prisma, and PostgreSQL.

## Getting Started

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Start development server
npm run dev
```

API runs on `http://localhost:3001`

## Project Structure

```
src/
├── index.ts              # Application entry point
├── middleware/           # Express middleware
├── routes/              # API routes
├── services/            # Business logic
├── repositories/        # Data access layer
├── validators/          # Input validation (Zod)
└── utils/              # Helper functions
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:slug` - Get service by slug

### Contact
- `POST /api/contact` - Create contact inquiry
- `GET /api/contact` - Get inquiries (auth required)
- `PATCH /api/contact/:id` - Update inquiry status (auth required)

## Environment Variables

See `.env.example` for all required variables.

## Database

Prisma ORM with PostgreSQL. Migrations stored in `prisma/migrations`.

```bash
# Run migrations
npm run db:migrate

# Open Prisma Studio
npm run db:studio
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript
- `npm start` - Run production build
- `npm run type-check` - Check TypeScript types
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
