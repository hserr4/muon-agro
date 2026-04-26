import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { TenantGuard } from '../tenant/tenant.guard';

@ApiTags('Dashboard')
@Controller('dashboard')
@ApiBearerAuth()
@UseGuards(TenantGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('metrics')
  getMetrics(@Req() req: any) {
    return this.dashboardService.getMetrics(req.tenantId);
  }

  @Get('revenue-chart')
  getRevenueChart(@Req() req: any, @Query('period') period: 'week' | 'month' | 'year') {
    return this.dashboardService.getRevenueChart(req.tenantId, period);
  }

  @Get('top-expenses')
  getTopExpenses(@Req() req: any, @Query('limit') limit?: number) {
    return this.dashboardService.getTopExpenses(req.tenantId, limit);
  }

  @Get('recent-activities')
  getRecentActivities(@Req() req: any, @Query('limit') limit?: number) {
    return this.dashboardService.getRecentActivities(req.tenantId, limit);
  }

  @Get('alerts')
  getAlerts(@Req() req: any) {
    return this.dashboardService.getAlerts(req.tenantId);
  }
}