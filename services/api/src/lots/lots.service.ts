import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLotDto, UpdateLotDto } from './dto/lot.dto';

@Injectable()
export class LotsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLotDto, tenantId: string) {
    return this.prisma.lot.create({
      data: {
        ...dto,
        tenantId,
      },
      include: {
        animals: {
          where: { isActive: true },
        },
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.lot.findMany({
      where: { tenantId },
      include: {
        animals: {
          where: { isActive: true },
          select: { id: true, tagNumber: true, gender: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    const lot = await this.prisma.lot.findFirst({
      where: { id, tenantId },
      include: {
        animals: {
          where: { isActive: true },
          include: {
            weightLogs: {
              orderBy: { measuredAt: 'desc' },
              take: 1,
            },
          },
        },
      },
    });

    if (!lot) {
      throw new NotFoundException('Lot not found');
    }

    return lot;
  }

  async update(id: string, dto: UpdateLotDto, tenantId: string) {
    await this.findOne(id, tenantId);

    return this.prisma.lot.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, tenantId: string) {
    await this.findOne(id, tenantId);

    return this.prisma.lot.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async getMetrics(tenantId: string) {
    const lots = await this.prisma.lot.findMany({
      where: { tenantId, isActive: true },
      include: {
        animals: {
          where: { isActive: true },
          include: {
            weightLogs: {
              orderBy: { measuredAt: 'desc' },
              take: 1,
            },
          },
        },
      },
    });

    return lots.map((lot) => ({
      id: lot.id,
      name: lot.name,
      animalCount: lot.animals.length,
      maxCapacity: lot.maxCapacity,
      occupancyRate: (lot.animals.length / lot.maxCapacity) * 100,
      averageWeight:
        lot.animals.length > 0
          ? lot.animals.reduce((sum, a) => sum + (a.weightLogs[0]?.weightKg || 0), 0) / lot.animals.length
          : 0,
    }));
  }
}