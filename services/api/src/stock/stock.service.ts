import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStockItemDto, UpdateStockItemDto, CreateStockMovementDto } from './dto/stock.dto';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  async createItem(dto: CreateStockItemDto, tenantId: string) {
    return this.prisma.stockItem.create({ data: { ...dto, tenantId } });
  }

  async findAllItems(tenantId: string) {
    return this.prisma.stockItem.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' },
    });
  }

  async findItem(id: string, tenantId: string) {
    const item = await this.prisma.stockItem.findFirst({ where: { id, tenantId } });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async updateItem(id: string, dto: UpdateStockItemDto, tenantId: string) {
    await this.findItem(id, tenantId);
    return this.prisma.stockItem.update({ where: { id }, data: dto });
  }

  async createMovement(dto: CreateStockMovementDto, tenantId: string) {
    const item = await this.findItem(dto.itemId, tenantId);
    const newQuantity = 
      dto.type === 'PURCHASE' || dto.type === 'TRANSFER_IN' 
        ? item.quantity + dto.quantity 
        : item.quantity - dto.quantity;

    const [movement] = await this.prisma.$transaction([
      this.prisma.stockMovement.create({
        data: { ...dto, tenantId },
      }),
      this.prisma.stockItem.update({
        where: { id: dto.itemId },
        data: { quantity: newQuantity },
      }),
    ]);

    return movement;
  }

  async getLowStockItems(tenantId: string) {
    return this.prisma.stockItem.findMany({
      where: { tenantId, quantity: { lte: this.prisma.stockItem.fields.minQuantity } },
    });
  }

  async getStockMetrics(tenantId: string) {
    const items = await this.prisma.stockItem.findMany({ where: { tenantId, isActive: true } });
    const totalValue = items.reduce((sum, i) => sum + (i.quantity * (i.costPerUnit || 0)), 0);
    return { itemCount: items.length, totalValue };
  }
}