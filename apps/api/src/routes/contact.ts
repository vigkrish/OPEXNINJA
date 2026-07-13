import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { ContactSchema } from '../validators';
import { ContactService } from '../services/ContactService';
import { authenticate } from '../middleware/authenticate';

export function contactRoutes(prisma: PrismaClient) {
  const router = Router();
  const contactService = new ContactService(prisma);

  // Create contact inquiry
  router.post('/', async (req, res, next) => {
    try {
      const input = ContactSchema.parse(req.body);
      const inquiry = await contactService.createInquiry(input);
      res.status(201).json({
        success: true,
        data: inquiry,
      });
    } catch (error) {
      next(error);
    }
  });

  // Get contact inquiries (admin only)
  router.get('/', authenticate, async (req, res, next) => {
    try {
      const { status } = req.query;
      const inquiries = await contactService.getInquiries(status as string);
      res.json({
        success: true,
        data: inquiries,
      });
    } catch (error) {
      next(error);
    }
  });

  // Update inquiry status (admin only)
  router.patch('/:id', authenticate, async (req, res, next) => {
    try {
      const { status } = req.body;
      const inquiry = await contactService.updateInquiryStatus(req.params.id, status);
      res.json({
        success: true,
        data: inquiry,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
}
