import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

export interface PlanFeatures {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  maxAnimals: number;
  maxFields: number;
  maxUsers: number;
  features: string[];
}

export const PLANS: Record<string, PlanFeatures> = {
  BASIC: {
    name: 'Básico',
    monthlyPrice: 199,
    yearlyPrice: 1990,
    maxAnimals: 500,
    maxFields: 10,
    maxUsers: 3,
    features: [
      'Gestão de animais',
      'Gestão de lotes',
      '2 talhões',
      'Fluxo de caixa básico',
      '3 usuários',
      'Suporte por email',
    ],
  },
  PROFESSIONAL: {
    name: 'Profissional',
    monthlyPrice: 499,
    yearlyPrice: 4990,
    maxAnimals: 2000,
    maxFields: 50,
    maxUsers: 10,
    features: [
      'Tudo do Básico',
      'Gestão agrícola',
      'Talhões ilimitados',
      'Fluxo de caixa completo',
      'Relatórios avançados',
      'AI Insights',
      'API Access',
      'Suporte prioridade',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    monthlyPrice: 999,
    yearlyPrice: 9990,
    maxAnimals: -1,
    maxFields: -1,
    maxUsers: -1,
    features: [
      'Tudo do Profissional',
      'Animais ilimitados',
      'Usuários ilimitados',
      'White label',
      'Integrações customizadas',
      'Gerente de conta',
      'SLA garantido',
      'Suporte 24/7',
    ],
  },
};

@Injectable()
export class BillingService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async getPlans() {
    return PLANS;
  }

  async getCurrentPlan(tenantId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { tenantId },
      include: { tenant: true },
    });

    if (!subscription) {
      return { plan: 'BASIC', status: 'TRIALING', features: PLANS.BASIC };
    }

    return {
      ...subscription,
      features: PLANS[subscription.plan],
    };
  }

  async checkLimits(tenantId: string) {
    const [subscription, animalCount, fieldCount, userCount] = await Promise.all([
      this.prisma.subscription.findUnique({ where: { tenantId } }),
      this.prisma.animal.count({ where: { tenantId, isActive: true } }),
      this.prisma.field.count({ where: { tenantId, isActive: true } }),
      this.prisma.user.count({ where: { tenantId, isActive: true } }),
    ]);

    const plan = subscription?.plan || 'BASIC';
    const limits = PLANS[plan];

    return {
      plan,
      animals: { current: animalCount, limit: limits.maxAnimals, remaining: limits.maxAnimals - animalCount },
      fields: { current: fieldCount, limit: limits.maxFields, remaining: limits.maxFields - fieldCount },
      users: { current: userCount, limit: limits.maxUsers, remaining: limits.maxUsers - userCount },
      isAtLimit: {
        animals: limits.maxAnimals > 0 && animalCount >= limits.maxAnimals,
        fields: limits.maxFields > 0 && fieldCount >= limits.maxFields,
        users: limits.maxUsers > 0 && userCount >= limits.maxUsers,
      },
    };
  }

  async createCheckoutSession(tenantId: string, plan: string, interval: 'monthly' | 'yearly') {
    const tenant = await this.prisma.tenant.findUnique({ where: { id: tenantId } });
    if (!tenant) throw new NotFoundException('Tenant not found');

    const planData = PLANS[plan];
    if (!planData) throw new NotFoundException('Plan not found');

    const amount = interval === 'monthly' ? planData.monthlyPrice * 100 : planData.yearlyPrice * 100;

    const session = {
      id: `cs_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      url: `https://checkout.stripe.com/pay/${Date.now()}`,
      amount,
      currency: 'brl',
      plan,
      interval,
      tenantId,
    };

    return session;
  }

  async handleWebhook(event: any) {
    const { type, data } = event;

    switch (type) {
      case 'invoice.paid':
        await this.handlePaymentSuccess(data);
        break;
      case 'invoice.payment_failed':
        await this.handlePaymentFailed(data);
        break;
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(data);
        break;
      case 'customer.subscription.deleted':
        await this.handleSubscriptionCancelled(data);
        break;
    }
  }

  private async handlePaymentSuccess(data: any) {
    const tenantId = data?.tenantId;
    if (!tenantId) return;

    await this.prisma.invoice.create({
      data: {
        tenantId,
        stripeInvoiceId: data?.id,
        amount: data?.amount_paid / 100,
        status: 'paid',
        paidAt: new Date(),
        dueDate: new Date(),
      },
    });
  }

  private async handlePaymentFailed(data: any) {
    const tenantId = data?.tenantId;
    if (!tenantId) return;

    await this.prisma.tenant.update({
      where: { id: tenantId },
      data: { status: 'PAST_DUE' },
    });

    await this.prisma.notification.create({
      data: {
        tenantId,
        type: 'ERROR',
        level: 'HIGH',
        title: 'Pagamento falhou',
        message: 'Seu pagamento não foi processado. Por favor, atualize o método de pagamento.',
        actionUrl: '/settings/billing',
      },
    });
  }

  private async handleSubscriptionUpdated(data: any) {
    const tenantId = data?.tenantId;
    if (!tenantId) return;

    await this.prisma.subscription.update({
      where: { tenantId },
      data: {
        status: data?.status === 'active' ? 'ACTIVE' : 'SUSPENDED',
      },
    });
  }

  private async handleSubscriptionCancelled(data: any) {
    const tenantId = data?.tenantId;
    if (!tenantId) return;

    await this.prisma.tenant.update({
      where: { id: tenantId },
      data: { status: 'CANCELLED' },
    });
  }
}