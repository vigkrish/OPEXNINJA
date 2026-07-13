import { PrismaClient } from '@prisma/client';

export class ServiceRepository {
  constructor(private prisma: PrismaClient) {}

  async getAllServices() {
    return this.prisma.service.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getServiceBySlug(slug: string) {
    return this.prisma.service.findUnique({
      where: { slug },
    });
  }

  async createService(data: any) {
    return this.prisma.service.create({ data });
  }
}
