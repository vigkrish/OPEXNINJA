import { PrismaClient } from '@prisma/client';
import { ContactInput } from '../validators';

export class ContactService {
  constructor(private prisma: PrismaClient) {}

  async createInquiry(input: ContactInput) {
    return this.prisma.contactInquiry.create({
      data: {
        email: input.email,
        name: input.name,
        phone: input.phone,
        company: input.company,
        message: input.message,
        subject: input.subject,
      },
    });
  }

  async getInquiries(status?: string) {
    return this.prisma.contactInquiry.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateInquiryStatus(id: string, status: string) {
    return this.prisma.contactInquiry.update({
      where: { id },
      data: { status },
    });
  }
}
