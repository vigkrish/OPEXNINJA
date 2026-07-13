import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { LoginSchema, RegisterSchema } from '../validators';
import { AuthService } from '../services/AuthService';
import { AuthRequest, authenticate } from '../middleware/authenticate';

export function authRoutes(prisma: PrismaClient) {
  const router = Router();
  const authService = new AuthService(prisma);

  // Register
  router.post('/register', async (req, res, next) => {
    try {
      const input = RegisterSchema.parse(req.body);
      const result = await authService.register(input);
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  });

  // Login
  router.post('/login', async (req, res, next) => {
    try {
      const input = LoginSchema.parse(req.body);
      const result = await authService.login(input);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  });

  // Refresh token
  router.post('/refresh', async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          error: { code: 'MISSING_TOKEN', message: 'Refresh token is required' },
        });
      }
      const tokens = await authService.refresh(refreshToken);
      res.json({
        success: true,
        data: tokens,
      });
    } catch (error) {
      next(error);
    }
  });

  // Get current user
  router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
    res.json({
      success: true,
      data: req.user,
    });
  });

  return router;
}
