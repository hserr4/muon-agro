import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LotsService } from './lots.service';
import { TenantGuard } from '../tenant/tenant.guard';
import { CreateLotDto, UpdateLotDto } from './dto/lot.dto';

@ApiTags('Lots')
@Controller('lots')
@ApiBearerAuth()
@UseGuards(TenantGuard)
export class LotsController {
  constructor(private readonly lotsService: LotsService) {}

  @Post()
  create(@Body() dto: CreateLotDto, @Req() req: any) {
    return this.lotsService.create(dto, req.tenantId);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.lotsService.findAll(req.tenantId);
  }

  @Get('metrics')
  getMetrics(@Req() req: any) {
    return this.lotsService.getMetrics(req.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.lotsService.findOne(id, req.tenantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLotDto, @Req() req: any) {
    return this.lotsService.update(id, dto, req.tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.lotsService.remove(id, req.tenantId);
  }
}