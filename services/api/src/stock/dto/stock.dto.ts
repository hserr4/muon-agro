import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreateStockItemDto {
  @ApiProperty({ example: 'Ração Premium 25kg' })
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: 'kg' })
  @IsString()
  unit: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsNumber()
  minQuantity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  costPerUnit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;
}

class UpdateStockItemDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  minQuantity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  costPerUnit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

class CreateStockMovementDto {
  @ApiProperty()
  @IsString()
  itemId: string;

  @ApiProperty({ enum: ['PURCHASE', 'SALE', 'TRANSFER', 'ADJUSTMENT'] })
  @IsString()
  type: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  quantity: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  unitCost?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;
}

export { CreateStockItemDto, UpdateStockItemDto, CreateStockMovementDto };