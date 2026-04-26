import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  custoPorArroba,
  custoPorCabeça,
  ganhoMedioDiario,
  taxaLotacao,
  arrobas,
} from '@muon/calculation-engine';

export interface DashboardMetrics {
  animalCount: number;
  lotCount: number;
  fieldCount: number;
  employeeCount: number;
  machineCount: number;
  
  revenue: number;
  expense: number;
  profit: number;
  
  averageWeight: number;
  totalWeight: number;
  occupancyRate: number;
  averageDailyGain: number;
  
  revenueChange: number;
  expenseChange: number;
  profitChange: number;
}

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getMetrics(tenantId: string): Promise<DashboardMetrics> {
    const [animals, lots, fields, employees, machines, cashFlows] = await Promise.all([
      this.prisma.animal.findMany({ where: { tenantId, isActive: true } }),
      this.prisma.lot.findMany({ where: { tenantId, isActive: true } }),
      this.prisma.field.findMany({ where: { tenantId, isActive: true } }),
      this.prisma.employee.findMany({ where: { tenantId, isActive: true } }),
      this.prisma.machine.findMany({ where: { tenantId, isActive: true } }),
      this.prisma.cashFlow.findMany({ where: { tenantId } }),
    ]);

    let totalWeight = 0;
    for (const animal of animals) {
      const latestWeight = await this.prisma.weightLog.findFirst({
        where: { animalId: animal.id },
        orderBy: { measuredAt: 'desc' },
      });
      if (latestWeight) {
        totalWeight += latestWeight.weightKg;
      }
    }

    const revenue = cashFlows
      .filter(c => c.type === 'INCOME')
      .reduce((sum, c) => sum + c.amount, 0);
    const expense = cashFlows
      .filter(c => c.type === 'EXPENSE')
      .reduce((sum, c) => sum + c.amount, 0);

    let totalOccupancy = 0;
    for (const lot of lots) {
      const lotAnimals = animals.filter(a => a.lotId === lot.id).length;
      totalOccupancy += taxaLotacao(lotAnimals, lot.maxCapacity || 100);
    }
    const avgOccupancy = lots.length > 0 ? totalOccupancy / lots.length : 0;

    return {
      animalCount: animals.length,
      lotCount: lots.length,
      fieldCount: fields.length,
      employeeCount: employees.length,
      machineCount: machines.length,
      revenue,
      expense,
      profit: revenue - expense,
      averageWeight: animals.length > 0 ? totalWeight / animals.length : 0,
      totalWeight,
      occupancyRate: avgOccupancy,
      averageDailyGain: 0,
      revenueChange: 0,
      expenseChange: 0,
      profitChange: 0,
    };
  }

  async getRevenueChart(tenantId: string, period: 'week' | 'month' | 'year') {
    const now = new Date();
    let startDate = new Date();

    if (period === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(now.getMonth() - 1);
    } else {
      startDate.setFullYear(now.getFullYear() - 1);
    }

    const flows = await this.prisma.cashFlow.findMany({
      where: { tenantId, date: { gte: startDate } },
      orderBy: { date: 'asc' },
    });

    const grouped: Record<string, { income: number; expense: number }> = {};

    for (const flow of flows) {
      const key = flow.date.toISOString().split('T')[0];
      if (!grouped[key]) {
        grouped[key] = { income: 0, expense: 0 };
      }
      if (flow.type === 'INCOME') {
        grouped[key].income += flow.amount;
      } else {
        grouped[key].expense += flow.amount;
      }
    }

    return Object.entries(grouped).map(([date, data]) => ({
      date,
      ...data,
      profit: data.income - data.expense,
    }));
  }

  async getTopExpenses(tenantId: string, limit = 5) {
    return this.prisma.cashFlow.findMany({
      where: { tenantId, type: 'EXPENSE' },
      orderBy: { amount: 'desc' },
      take: limit,
    });
  }

  async getRecentActivities(tenantId: string, limit = 10) {
    const [recentWeights, recentActivities, recentCashFlows] = await Promise.all([
      this.prisma.weightLog.findMany({
        where: { animal: { tenantId } },
        orderBy: { measuredAt: 'desc' },
        take: limit,
        include: { animal: true },
      }),
      this.prisma.animalActivity.findMany({
        where: { animal: { tenantId } },
        orderBy: { performedAt: 'desc' },
        take: limit,
        include: { animal: true },
      }),
      this.prisma.cashFlow.findMany({
        where: { tenantId },
        orderBy: { date: 'desc' },
        take: limit,
      }),
    ]);

    return [
      ...recentWeights.map(w => ({
        type: 'weight',
        title: `Pesagem: ${w.animal.tagNumber}`,
        value: `${w.weightKg} kg`,
        date: w.measuredAt,
      })),
      ...recentActivities.map(a => ({
        type: 'activity',
        title: `${a.type}: ${a.animal.tagNumber}`,
        value: a.description || '',
        date: a.performedAt,
      })),
      ...recentCashFlows.map(c => ({
        type: 'cashflow',
        title: c.type,
        value: `${c.type === 'INCOME' ? '+' : '-'}R$ ${c.amount.toLocaleString('pt-BR')}`,
        date: c.date,
      })),
    ]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
  }

  async getAlerts(tenantId: string) {
    const alerts: any[] = [];

    const animals = await this.prisma.animal.findMany({
      where: { tenantId, isActive: true },
    });

    const stockItems = await this.prisma.stockItem.findMany({
      where: { tenantId, isActive: true, quantity: { lte: 5 } },
    });

    if (stockItems.length > 0) {
      alerts.push({
        type: 'warning',
        title: 'Estoque baixo',
        message: `${stockItems.length} itens estão com estoque baixo`,
        actionUrl: '/stock',
      });
    }

    const subscription = await this.prisma.subscription.findUnique({
      where: { tenantId },
    });

    if (subscription?.status === 'PAST_DUE') {
      alerts.push({
        type: 'error',
        title: 'Pagamento pendente',
        message: 'Sua assinatura está com pagamento pendente',
        actionUrl: '/settings/billing',
      });
    }

    return alerts;
  }
}