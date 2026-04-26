import { IsString, IsOptional, IsNumber, IsBoolean, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreateLotDto {
  @ApiProperty({ example: 'Lote A - Recria' })
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ default: 100 })
  @IsOptional()
  @IsNumber()
  maxCapacity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  targetWeight?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  entryDate?: string;
}

class UpdateLotDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxCapacity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  targetWeight?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export { CreateLotDto, UpdateLotDto };