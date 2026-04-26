import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTenantDto, UpdateTenantDto } from './dto/tenant.dto';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTenantDto) {
    const subdomain = dto.subdomain?.toLowerCase() || dto.name.toLowerCase().replace(/\s+/g, '-');
    
    const existing = await this.prisma.tenant.findUnique({
      where: { subdomain },
    });

    if (existing) {
      throw new ForbiddenException('Subdomain already in use');
    }

    return this.prisma.tenant.create({
      data: {
        name: dto.name,
        subdomain,
        plan: dto.plan || 'BASIC',
        status: 'ACTIVE',
      },
    });
  }

  async findBySubdomain(subdomain: string) {
    return this.prisma.tenant.findUnique({
      where: { subdomain },
    });
  }

  async findById(id: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id },
    });

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }

  async update(id: string, dto: UpdateTenantDto) {
    await this.findById(id);

    return this.prisma.tenant.update({
      where: { id },
      data: dto,
    });
  }

  async getMetrics(tenantId: string) {
    const [
      animalCount,
      lotCount,
      fieldCount,
      employeeCount,
      machineCount,
      monthlyRevenue,
      monthlyExpense,
    ] = await Promise.all([
      this.prisma.animal.count({ where: { tenantId, isActive: true } }),
      this.prisma.lot.count({ where: { tenantId, isActive: true } }),
      this.prisma.field.count({ where: { tenantId, isActive: true } }),
      this.prisma.employee.count({ where: { tenantId, isActive: true } }),
      this.prisma.machine.count({ where: { tenantId, isActive: true } }),
      this.prisma.cashFlow.aggregate({
        where: { tenantId, type: 'INCOME', date: { gte: new Date(new Date().setDate(1)) } },
        _sum: { amount: true },
      }),
      this.prisma.cashFlow.aggregate({
        where: { tenantId, type: 'EXPENSE', date: { gte: new Date(new Date().setDate(1)) } },
        _sum: { amount: true },
      }),
    ]);

    return {
      animalCount,
      lotCount,
      fieldCount,
      employeeCount,
      machineCount,
      monthlyRevenue: monthlyRevenue._sum.amount || 0,
      monthlyExpense: monthlyExpense._sum.amount || 0,
      monthlyProfit: (monthlyRevenue._sum.amount || 0) - (monthlyExpense._sum.amount || 0),
    };
  }
}