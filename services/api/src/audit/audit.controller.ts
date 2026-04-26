import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { TenantGuard } from '../tenant/tenant.guard';

@ApiTags('Audit')
@Controller('audit')
@ApiBearerAuth()
@UseGuards(TenantGuard)
export class AuditController {
  constructor(private readonly service: AuditService) {}

  @Get()
  findAll(@Req() req: any, @Query() query: any) {
    return this.service.findAll(req.tenantId, query);
  }
}