import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from './middleware/errorHandler';
import { authRoutes } from './routes/auth';
import { serviceRoutes } from './routes/services';
import { contactRoutes } from './routes/contact';

const app: Express = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'opexninja-api',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes(prisma));
app.use('/api/services', serviceRoutes(prisma));
app.use('/api/contact', contactRoutes(prisma));

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found',
    },
  });
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`OPEX Ninja API running on port ${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});

async function shutdown(signal: string) {
  console.log(`${signal}: shutting down...`);
  await prisma.$disconnect();
  server.close(() => process.exit(0));
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));

export { app, prisma };
