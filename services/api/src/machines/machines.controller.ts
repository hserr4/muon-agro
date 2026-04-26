import { Controller, Get, Post, Patch, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MachinesService } from './machines.service';
import { TenantGuard } from '../tenant/tenant.guard';

@ApiTags('Machines')
@Controller('machines')
@ApiBearerAuth()
@UseGuards(TenantGuard)
export class MachinesController {
  constructor(private readonly service: MachinesService) {}

  @Post()
  create(@Body() dto: any, @Req() req: any) {
    return this.service.create(dto, req.tenantId);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.service.findAll(req.tenantId);
  }

  @Get('metrics')
  getMetrics(@Req() req: any) {
    return this.service.getMetrics(req.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.service.findOne(id, req.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any, @Req() req: any) {
    return this.service.update(id, dto, req.tenantId);
  }

  @Post(':id/maintenance')
  createMaintenance(@Param('id') id: string, @Body() dto: any) {
    return this.service.createMaintenance(id, dto);
  }

  @Get(':id/maintenance')
  getMaintenance(@Param('id') id: string) {
    return this.service.getMaintenance(id);
  }
}