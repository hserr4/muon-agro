import { Controller, Get, Post, Body, Param, UseGuards, Req, Headers } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BillingService, PLANS } from './billing.service';
import { TenantGuard } from '../tenant/tenant.guard';

@ApiTags('Billing')
@Controller('billing')
@ApiBearerAuth()
@UseGuards(TenantGuard)
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('plans')
  @ApiOperation({ summary: 'Get available plans' })
  getPlans() {
    return this.billingService.getPlans();
  }

  @Get('current')
  @ApiOperation({ summary: 'Get current subscription' })
  getCurrentPlan(@Req() req: any) {
    return this.billingService.getCurrentPlan(req.tenantId);
  }

  @Get('limits')
  @ApiOperation({ summary: 'Check usage limits' })
  getLimits(@Req() req: any) {
    return this.billingService.checkLimits(req.tenantId);
  }

  @Post('checkout')
  @ApiOperation({ summary: 'Create checkout session' })
  createCheckout(
    @Req() req: any,
    @Body() body: { plan: string; interval: 'monthly' | 'yearly' }
  ) {
    return this.billingService.createCheckoutSession(req.tenantId, body.plan, body.interval);
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Stripe webhook endpoint' })
  handleWebhook(@Body() body: any, @Headers('stripe-signature') signature: string) {
    return this.billingService.handleWebhook(body);
  }
}