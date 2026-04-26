import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MachinesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any, tenantId: string) {
    return this.prisma.machine.create({ data: { ...dto, tenantId } });
  }

  async findAll(tenantId: string) {
    return this.prisma.machine.findMany({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string) {
    const m = await this.prisma.machine.findFirst({ 
      where: { id, tenantId },
      include: { maintenanceRecords: { orderBy: { performedAt: 'desc' }, take: 5 } }
    });
    if (!m) throw new NotFoundException('Machine not found');
    return m;
  }

  async update(id: string, dto: any, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.machine.update({ where: { id }, data: dto });
  }

  async delete(id: string, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.machine.update({ where: { id }, data: { isActive: false } });
  }

  async createMaintenance(machineId: string, dto: any) {
    return this.prisma.maintenanceRecord.create({ data: { ...dto, machineId } });
  }

  async getMaintenance(machineId: string) {
    return this.prisma.maintenanceRecord.findMany({ where: { machineId }, orderBy: { performedAt: 'desc' } });
  }

  async getMetrics(tenantId: string) {
    const machines = await this.prisma.machine.findMany({ where: { tenantId, isActive: true } });
    const totalMaintenanceCost = (
      await this.prisma.maintenanceRecord.aggregate({
        where: { machine: { tenantId } },
        _sum: { cost: true },
      })
    )._sum.cost || 0;

    return { machineCount: machines.length, totalMaintenanceCost };
  }
}