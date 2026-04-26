import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFieldDto, UpdateFieldDto, CreatePlantationDto, CreateHarvestDto } from './dto/field.dto';

@Injectable()
export class FieldsService {
  constructor(private prisma: PrismaService) {}

  async createField(dto: CreateFieldDto, tenantId: string) {
    return this.prisma.field.create({
      data: { ...dto, tenantId },
    });
  }

  async findAllFields(tenantId: string) {
    return this.prisma.field.findMany({
      where: { tenantId },
      include: {
        plantations: true,
      },
    });
  }

  async findField(id: string, tenantId: string) {
    const field = await this.prisma.field.findFirst({
      where: { id, tenantId },
      include: {
        plantations: true,
        harvests: { orderBy: { harvestedAt: 'desc' }, take: 5 },
      },
    });

    if (!field) throw new NotFoundException('Field not found');
    return field;
  }

  async updateField(id: string, dto: UpdateFieldDto, tenantId: string) {
    await this.findField(id, tenantId);
    return this.prisma.field.update({ where: { id }, data: dto });
  }

  async deleteField(id: string, tenantId: string) {
    await this.findField(id, tenantId);
    return this.prisma.field.update({ where: { id }, data: { isActive: false } });
  }

  async createPlantation(dto: CreatePlantationDto, tenantId: string) {
    return this.prisma.plantation.create({
      data: { ...dto, tenantId },
      include: { field: true },
    });
  }

  async getActivePlantations(tenantId: string) {
    return this.prisma.plantation.findMany({
      where: { tenantId, expectedHarvestDate: { gte: new Date() } },
      include: { field: true },
    });
  }

  async createHarvest(dto: CreateHarvestDto, tenantId: string) {
    return this.prisma.harvest.create({
      data: { ...dto, tenantId },
      include: { field: true, plantation: true },
    });
  }

  async getFieldMetrics(tenantId: string) {
    const fields = await this.prisma.field.findMany({
      where: { tenantId, isActive: true },
      include: {
        plantations: true,
        harvests: true,
      },
    });

    const totalArea = fields.reduce((sum, f) => sum + f.areaHa, 0);
    const totalHarvest = (
      await this.prisma.harvest.aggregate({
        where: { tenantId },
        _sum: { quantityKg: true },
      })
    )._sum.quantityKg || 0;

    return { fieldCount: fields.length, totalArea, totalHarvest };
  }
}