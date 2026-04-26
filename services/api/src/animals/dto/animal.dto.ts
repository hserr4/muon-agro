import { IsString, IsDateString, IsOptional, IsEnum, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

class CreateAnimalDto {
  @ApiProperty({ example: 'BOV001' })
  @IsString()
  tagNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  qrCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiProperty()
  @IsDateString()
  birthDate: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  breed?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lotId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sireId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  damId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observations?: string;
}

class UpdateAnimalDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  breed?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lotId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sireId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  damId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observations?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

class AddWeightLogDto {
  @ApiProperty({ example: 250.5 })
  @IsNumber()
  weightKg: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observations?: string;
}

class AnimalQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lotId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export { CreateAnimalDto, UpdateAnimalDto, AddWeightLogDto, AnimalQueryDto, Gender };