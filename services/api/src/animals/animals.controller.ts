import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AnimalsService } from './animals.service';
import { TenantGuard } from '../tenant/tenant.guard';
import { CreateAnimalDto, UpdateAnimalDto, AddWeightLogDto, AnimalQueryDto } from './dto/animal.dto';
import { Request } from 'express';

@ApiTags('Animals')
@Controller('animals')
@ApiBearerAuth()
@UseGuards(TenantGuard)
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new animal' })
  @ApiResponse({ status: 201, description: 'Animal created' })
  create(@Body() dto: CreateAnimalDto, @Req() req: Request) {
    return this.animalsService.create(dto, req.tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'List all animals' })
  @ApiResponse({ status: 200, description: 'Animals list' })
  findAll(@Req() req: Request, @Query() query: AnimalQueryDto) {
    return this.animalsService.findAll(req.tenantId, query);
  }

  @Get('metrics')
  @ApiOperation({ summary: 'Get animal metrics' })
  @ApiResponse({ status: 200, description: 'Metrics' })
  getMetrics(@Req() req: Request) {
    return this.animalsService.getMetrics(req.tenantId);
  }

  @Get('search/:tagNumber')
  @ApiOperation({ summary: 'Search animal by tag' })
  @ApiResponse({ status: 200, description: 'Animal found' })
  findByTag(@Param('tagNumber') tagNumber: string, @Req() req: Request) {
    return this.animalsService.findByTag(tagNumber, req.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get animal by ID' })
  @ApiResponse({ status: 200, description: 'Animal' })
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.animalsService.findOne(id, req.tenantId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update animal' })
  @ApiResponse({ status: 200, description: 'Animal updated' })
  update(@Param('id') id: string, @Body() dto: UpdateAnimalDto, @Req() req: Request) {
    return this.animalsService.update(id, dto, req.tenantId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete (soft) animal' })
  @ApiResponse({ status: 200, description: 'Animal deleted' })
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.animalsService.remove(id, req.tenantId);
  }

  @Post(':id/weight')
  @ApiOperation({ summary: 'Add weight log' })
  @ApiResponse({ status: 201, description: 'Weight log added' })
  addWeightLog(@Param('id') id: string, @Body() dto: AddWeightLogDto, @Req() req: Request) {
    return this.animalsService.addWeightLog(id, dto, req.tenantId);
  }

  @Get(':id/weight')
  @ApiOperation({ summary: 'Get weight history' })
  @ApiResponse({ status: 200, description: 'Weight history' })
  getWeightHistory(@Param('id') id: string, @Req() req: Request) {
    return this.animalsService.getWeightHistory(id, req.tenantId);
  }
}