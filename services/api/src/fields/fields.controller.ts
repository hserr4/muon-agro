import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FieldsService } from './fields.service';
import { TenantGuard } from '../tenant/tenant.guard';
import { CreateFieldDto, UpdateFieldDto, CreatePlantationDto, CreateHarvestDto } from './dto/field.dto';

@ApiTags('Fields')
@Controller('fields')
@ApiBearerAuth()
@UseGuards(TenantGuard)
export class FieldsController {
  constructor(private readonly service: FieldsService) {}

  @Post()
  createField(@Body() dto: CreateFieldDto, @Req() req: any) {
    return this.service.createField(dto, req.tenantId);
  }

  @Get()
  findAllFields(@Req() req: any) {
    return this.service.findAllFields(req.tenantId);
  }

  @Get('metrics')
  getMetrics(@Req() req: any) {
    return this.service.getFieldMetrics(req.tenantId);
  }

  @Get('plantations')
  getPlantations(@Req() req: any) {
    return this.service.getActivePlantations(req.tenantId);
  }

  @Get(':id')
  findField(@Param('id') id: string, @Req() req: any) {
    return this.service.findField(id, req.tenantId);
  }

  @Patch(':id')
  updateField(@Param('id') id: string, @Body() dto: UpdateFieldDto, @Req() req: any) {
    return this.service.updateField(id, dto, req.tenantId);
  }

  @Delete(':id')
  deleteField(@Param('id') id: string, @Req() req: any) {
    return this.service.deleteField(id, req.tenantId);
  }

  @Post('plantations')
  createPlantation(@Body() dto: CreatePlantationDto, @Req() req: any) {
    return this.service.createPlantation(dto, req.tenantId);
  }

  @Post('harvests')
  createHarvest(@Body() dto: CreateHarvestDto, @Req() req: any) {
    return this.service.createHarvest(dto, req.tenantId);
  }
}