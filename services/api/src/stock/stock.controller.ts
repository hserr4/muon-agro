import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { StockService } from './stock.service';
import { TenantGuard } from '../tenant/tenant.guard';
import { CreateStockItemDto, UpdateStockItemDto, CreateStockMovementDto } from './dto/stock.dto';

@ApiTags('Stock')
@Controller('stock')
@ApiBearerAuth()
@UseGuards(TenantGuard)
export class StockController {
  constructor(private readonly service: StockService) {}

  @Post()
  createItem(@Body() dto: CreateStockItemDto, @Req() req: any) {
    return this.service.createItem(dto, req.tenantId);
  }

  @Get()
  findAllItems(@Req() req: any) {
    return this.service.findAllItems(req.tenantId);
  }

  @Get('low-stock')
  getLowStock(@Req() req: any) {
    return this.service.getLowStockItems(req.tenantId);
  }

  @Get('metrics')
  getMetrics(@Req() req: any) {
    return this.service.getStockMetrics(req.tenantId);
  }

  @Get(':id')
  findItem(@Param('id') id: string, @Req() req: any) {
    return this.service.findItem(id, req.tenantId);
  }

  @Patch(':id')
  updateItem(@Param('id') id: string, @Body() dto: UpdateStockItemDto, @Req() req: any) {
    return this.service.updateItem(id, dto, req.tenantId);
  }

  @Post('movements')
  createMovement(@Body() dto: CreateStockMovementDto, @Req() req: any) {
    return this.service.createMovement(dto, req.tenantId);
  }
}