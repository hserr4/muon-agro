import { Injectable } from '@nestjs/common';
import { NotificationType, NotificationLevel } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string, unreadOnly = false) {
    return this.prisma.notification.findMany({
      where: {
        tenantId,
        ...(unreadOnly ? { read: false } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async create(data: {
    tenantId: string;
    type: NotificationType;
    level?: NotificationLevel;
    title: string;
    message: string;
    actionUrl?: string;
  }) {
    return this.prisma.notification.create({ data });
  }

  async markAsRead(id: string, tenantId: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { read: true, readAt: new Date() },
    });
  }

  async markAllAsRead(tenantId: string) {
    return this.prisma.notification.updateMany({
      where: { tenantId, read: false },
      data: { read: true, readAt: new Date() },
    });
  }

  async getUnreadCount(tenantId: string) {
    return this.prisma.notification.count({
      where: { tenantId, read: false },
    });
  }

  async delete(id: string, tenantId: string) {
    return this.prisma.notification.delete({
      where: { id },
    });
  }

  async notifyLowStock(tenantId: string, items: any[]) {
    for (const item of items) {
      if (item.quantity <= item.minQuantity) {
        await this.create({
          tenantId,
          type: 'WARNING',
          level: 'MEDIUM',
          title: 'Estoque baixo',
          message: `${item.name} está com apenas ${item.quantity} unidades`,
          actionUrl: '/stock',
        });
      }
    }
  }

  async notifyPaymentFailed(tenantId: string) {
    await this.create({
      tenantId,
      type: 'ERROR',
      level: 'HIGH',
      title: 'Pagamento falhou',
      message: 'Seu pagamento não foi processado. Atualize o método de pagamento.',
      actionUrl: '/settings/billing',
    });
  }
}