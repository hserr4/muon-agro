import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreateFieldDto {
  @ApiProperty({ example: 'Talhão A' })
  @IsString()
  name: string;

  @ApiProperty({ example: 50.5 })
  @IsNumber()
  areaHa: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  soilType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;
}

class UpdateFieldDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  areaHa?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  soilType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

class CreatePlantationDto {
  @ApiProperty()
  @IsString()
  fieldId: string;

  @ApiProperty({ example: 'Soja' })
  @IsString()
  cropName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  variety?: string;

  @ApiProperty()
  @IsString()
  plantedAt: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  expectedHarvestDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  areaPlanted?: number;
}

class CreateHarvestDto {
  @ApiProperty()
  @IsString()
  fieldId: string;

  @ApiProperty()
  @IsString()
  plantationId: string;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  quantityKg: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  quality?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  pricePerKg?: number;
}

export { CreateFieldDto, UpdateFieldDto, CreatePlantationDto, CreateHarvestDto };