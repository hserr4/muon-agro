import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnimalDto, UpdateAnimalDto, AddWeightLogDto } from './dto/animal.dto';

@Injectable()
export class AnimalsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAnimalDto, tenantId: string) {
    return this.prisma.animal.create({
      data: {
        ...dto,
        tenantId,
        qrCode: dto.qrCode || `QR-${dto.tagNumber}`,
      },
      include: {
        lot: true,
      },
    });
  }

  async findAll(tenantId: string, filters?: { lotId?: string; isActive?: boolean }) {
    return this.prisma.animal.findMany({
      where: {
        tenantId,
        ...filters,
      },
      include: {
        lot: true,
        weightLogs: {
          orderBy: { measuredAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { tagNumber: 'asc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    const animal = await this.prisma.animal.findFirst({
      where: { id, tenantId },
      include: {
        lot: true,
        weightLogs: {
          orderBy: { measuredAt: 'desc' },
        },
        sire: true,
        dam: true,
        offspring: true,
      },
    });

    if (!animal) {
      throw new NotFoundException('Animal not found');
    }

    return animal;
  }

  async update(id: string, dto: UpdateAnimalDto, tenantId: string) {
    await this.findOne(id, tenantId);

    return this.prisma.animal.update({
      where: { id },
      data: dto,
      include: {
        lot: true,
      },
    });
  }

  async remove(id: string, tenantId: string) {
    await this.findOne(id, tenantId);

    return this.prisma.animal.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async addWeightLog(id: string, dto: AddWeightLogDto, tenantId: string) {
    const animal = await this.findOne(id, tenantId);

    return this.prisma.weightLog.create({
      data: {
        animalId: id,
        weightKg: dto.weightKg,
        observations: dto.observations,
      },
      include: {
        animal: true,
      },
    });
  }

  async getWeightHistory(id: string, tenantId: string) {
    await this.findOne(id, tenantId);

    return this.prisma.weightLog.findMany({
      where: { animalId: id },
      orderBy: { measuredAt: 'desc' },
    });
  }

  async getMetrics(tenantId: string) {
    const animals = await this.prisma.animal.findMany({
      where: { tenantId, isActive: true },
      include: {
        weightLogs: {
          orderBy: { measuredAt: 'desc' },
          take: 2,
        },
      },
    });

    let totalWeight = 0;
    let animalCount = 0;

    for (const animal of animals) {
      if (animal.weightLogs.length > 0) {
        totalWeight += animal.weightLogs[0].weightKg;
        animalCount++;
      }
    }

    const lots = await this.prisma.lot.findMany({
      where: { tenantId, isActive: true },
      include: {
        animals: {
          where: { isActive: true },
        },
      },
    });

    let avgAnimalsPerLot = 0;
    if (lots.length > 0) {
      const totalAnimals = lots.reduce((sum, lot) => sum + lot.animals.length, 0);
      avgAnimalsPerLot = totalAnimals / lots.length;
    }

    return {
      totalAnimals: animalCount,
      averageWeight: animalCount > 0 ? totalWeight / animalCount : 0,
      totalLots: lots.length,
      avgAnimalsPerLot,
    };
  }

  async findByTag(tagNumber: string, tenantId: string) {
    const animal = await this.prisma.animal.findFirst({
      where: { tagNumber, tenantId },
      include: {
        lot: true,
        weightLogs: {
          orderBy: { measuredAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!animal) {
      throw new NotFoundException('Animal not found');
    }

    return animal;
  }
}