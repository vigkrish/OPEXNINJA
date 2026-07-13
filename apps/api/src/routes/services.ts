import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { ServiceRepository } from '../repositories/ServiceRepository';

export function serviceRoutes(prisma: PrismaClient) {
  const router = Router();
  const serviceRepo = new ServiceRepository(prisma);

  // Get all services
  router.get('/', async (req, res, next) => {
    try {
      const services = await serviceRepo.getAllServices();
      res.json({
        success: true,
        data: services,
      });
    } catch (error) {
      next(error);
    }
  });

  // Get service by slug
  router.get('/:slug', async (req, res, next) => {
    try {
      const service = await serviceRepo.getServiceBySlug(req.params.slug);
      if (!service) {
        return res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Service not found' },
        });
      }
      res.json({
        success: true,
        data: service,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
}
