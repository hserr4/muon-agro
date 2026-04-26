import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CashFlowService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any, tenantId: string) {
    return this.prisma.cashFlow.create({ data: { ...dto, tenantId } });
  }

  async findAll(tenantId: string, filters?: { type?: string; startDate?: Date; endDate?: Date }) {
    return this.prisma.cashFlow.findMany({
      where: { tenantId, ...filters },
      orderBy: { date: 'desc' },
    });
  }

  async getSummary(tenantId: string, period?: 'daily' | 'monthly' | 'yearly') {
    const now = new Date();
    let startDate = new Date();
    
    if (period === 'monthly') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (period === 'yearly') {
      startDate = new Date(now.getFullYear(), 0, 1);
    } else {
      startDate = new Date(now.setDate(now.getDate() - 30));
    }

    const [income, expense] = await Promise.all([
      this.prisma.cashFlow.aggregate({
        where: { tenantId, type: 'INCOME', date: { gte: startDate } },
        _sum: { amount: true },
      }),
      this.prisma.cashFlow.aggregate({
        where: { tenantId, type: 'EXPENSE', date: { gte: startDate } },
        _sum: { amount: true },
      }),
    ]);

    const totalIncome = income._sum.amount || 0;
    const totalExpense = expense._sum.amount || 0;

    return {
      period,
      totalIncome,
      totalExpense,
      netProfit: totalIncome - totalExpense,
    };
  }

  async getCategoryBreakdown(tenantId: string) {
    const flows = await this.prisma.cashFlow.findMany({ where: { tenantId } });
    
    const byCategory = flows.reduce((acc, flow) => {
      const cat = flow.category || 'Outros';
      if (!acc[flow.type]) acc[flow.type] = {};
      acc[flow.type][cat] = (acc[flow.type][cat] || 0) + flow.amount;
      return acc;
    }, {} as Record<string, Record<string, number>>);

    return byCategory;
  }
}