import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TenantService } from './tenant.service';
import { TenantGuard } from './tenant.guard';
import { CreateTenantDto, UpdateTenantDto } from './dto/tenant.dto';

@ApiTags('Tenants')
@Controller('tenants')
@ApiBearerAuth()
@UseGuards(TenantGuard)
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current tenant' })
  async getCurrentTenant() {
    return this.tenantService.findById('current'); // Will be set from guard
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current tenant' })
  async updateCurrentTenant(@Body() dto: UpdateTenantDto) {
    return this.tenantService.update('current', dto);
  }

  @Get('me/metrics')
  @ApiOperation({ summary: 'Get tenant metrics' })
  async getMetrics() {
    return this.tenantService.getMetrics('current');
  }
}