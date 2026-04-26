import { Type } from 'class-transformer';
import { IsNumber, Min, IsOptional } from 'class-validator';

export class LotWeightSummary {
  @IsNumber()
  totalWeightKg: number;

  @IsNumber()
  animalCount: number;

  @IsNumber()
  averageWeightKg: number;

  @IsNumber()
  averageDailyGain: number;

  @IsNumber()
  latestWeightKg: number;

  @IsNumber()
  previousWeightKg: number;
}

export class LotMetrics {
  @IsNumber()
  lotId: string;

  @IsNumber()
  name: string;

  @IsNumber()
  animalCount: number;

  @IsNumber()
  maxCapacity: number;

  @IsNumber()
  occupancyRate: number;

  @IsNumber()
  totalWeightKg: number;

  @IsNumber()
  averageWeightKg: number;

  @IsNumber()
  averageDailyGain: number;

  @IsNumber()
  projectedDaysToTarget: number;
}

export class CostAnalysis {
  @IsNumber()
  totalCost: number;

  @IsNumber()
  costPerArroba: number;

  @IsNumber()
  costPerHead: number;

  @IsNumber()
  costPerKg: number;
}

export class FieldMetrics {
  @IsNumber()
  fieldId: string;

  @IsNumber()
  name: string;

  @IsNumber()
  areaHa: number;

  @IsNumber()
  yieldKgPerHa: number;

  @IsNumber()
  totalProductionKg: number;

  @IsNumber()
  revenue: number;

  @IsNumber()
  profit: number;
}