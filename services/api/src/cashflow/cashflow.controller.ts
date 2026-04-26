import { Controller, Get, Post, Param, Body, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CashFlowService } from './cashflow.service';
import { TenantGuard } from '../tenant/tenant.guard';

@ApiTags('CashFlow')
@Controller('cashflow')
@ApiBearerAuth()
@UseGuards(TenantGuard)
export class CashFlowController {
  constructor(private readonly service: CashFlowService) {}

  @Post()
  create(@Body() dto: any, @Req() req: any) {
    return this.service.create(dto, req.tenantId);
  }

  @Get()
  findAll(@Req() req: any, @Query() query: any) {
    return this.service.findAll(req.tenantId, query);
  }

  @Get('summary')
  getSummary(@Req() req: any, @Query('period') period: 'daily' | 'monthly' | 'yearly') {
    return this.service.getSummary(req.tenantId, period);
  }

  @Get('by-category')
  getByCategory(@Req() req: any) {
    return this.service.getCategoryBreakdown(req.tenantId);
  }
}