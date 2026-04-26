import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

enum PlanTier {
  BASIC = 'BASIC',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE',
}

enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  PAST_DUE = 'PAST_DUE',
  CANCELLED = 'CANCELLED',
  SUSPENDED = 'SUSPENDED',
}

class CreateTenantDto {
  @ApiProperty({ example: 'Fazenda Boa Vista' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'bvista' })
  @IsOptional()
  @IsString()
  subdomain?: string;

  @ApiPropertyOptional({ enum: PlanTier })
  @IsOptional()
  @IsEnum(PlanTier)
  plan?: PlanTier;
}

class UpdateTenantDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: SubscriptionStatus })
  @IsOptional()
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus;
}

export { CreateTenantDto, UpdateTenantDto, PlanTier, SubscriptionStatus };