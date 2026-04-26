import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log(data: { tenantId: string; userId?: string; action: string; entity: string; entityId: string; changes?: any; ipAddress?: string }) {
    return this.prisma.auditLog.create({ data });
  }

  async findAll(tenantId: string, filters?: { userId?: string; entity?: string }) {
    return this.prisma.auditLog.findMany({
      where: { tenantId, ...filters },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }
}