export function custoPorArroba(totalCost: number, arrobas: number): number {
  if (arrobas <= 0) return 0;
  return totalCost / arrobas;
}

export function custoPorKg(totalCost: number, weightKg: number): number {
  if (weightKg <= 0) return 0;
  return totalCost / weightKg;
}

export function custoPorCabeça(totalCost: number, headCount: number): number {
  if (headCount <= 0) return 0;
  return totalCost / headCount;
}

export function ganhoMedioDiario(startWeightKg: number, endWeightKg: number, days: number): number {
  if (days <= 0) return 0;
  return (endWeightKg - startWeightKg) / days;
}

export function taxaLotacao(animals: number, maxCapacity: number): number {
  if (maxCapacity <= 0) return 0;
  return (animals / maxCapacity) * 100;
}

export function pontoEquilibrio(fixedCost: number, contributionMarginPerArroba: number): number {
  if (contributionMarginPerArroba <= 0) return 0;
  return fixedCost / contributionMarginPerArroba;
}

export function viabilidadeLote(expectedRevenue: number, expectedCost: number): boolean {
  return expectedRevenue - expectedCost > 0;
}

export function projecaoPeso(
  currentWeight: number,
  gmd: number,
  days: number
): number {
  return currentWeight + (gmd * days);
}

export function arrobas(weightKg: number, divisor: number = 15): number {
  return weightKg / divisor;
}

export function calcularICP(pesoAtual: number, pesoInicial: number, custoTotal: number): number {
  if (pesoInicial <= 0 || pesoAtual <= pesoInicial) return 0;
  const pesoGanho = pesoAtual - pesoInicial;
  return custoTotal / pesoGanho;
}

export function diasParaPesada(pesoAtual: number, pesoAlvo: number, gmd: number): number {
  if (gmd <= 0) return 0;
  return Math.ceil((pesoAlvo - pesoAtual) / gmd);
}

export function rentabilidadeM2(area: number, receita: number): number {
  return area > 0 ? receita / area : 0;
}

export function calculateLotMetrics(
  animals: Array<{ currentWeight: number; previousWeight: number; daysInPeriod: number }>,
  maxCapacity: number,
  totalCost: number,
  targetWeight?: number
) {
  const animalCount = animals.length;
  const totalWeight = animals.reduce((sum, a) => sum + a.currentWeight, 0);
  const avgWeight = animalCount > 0 ? totalWeight / animalCount : 0;
  const avgWeightPrevious = animals.reduce((sum, a) => sum + (a.previousWeight || a.currentWeight), 0) / animalCount;
  const totalGmd = animals.reduce((sum, a) => ganhoMedioDiario(a.previousWeight || a.currentWeight, a.currentWeight, a.daysInPeriod || 1), 0);
  const avgGmd = animalCount > 0 ? totalGmd / animalCount : 0;
  
  let projectedDaysToTarget = 0;
  if (targetWeight && avgWeight && avgGmd > 0) {
    projectedDaysToTarget = diasParaPesada(avgWeight, targetWeight, avgGmd);
  }

  return {
    animalCount,
    occupancyRate: taxaLotacao(animalCount, maxCapacity),
    totalWeight,
    averageWeight: avgWeight,
    averageDailyGain: avgGmd,
    projectedDaysToTarget,
    costPerHead: custoPorCabeça(totalCost, animalCount),
  };
}

export function calculateFieldMetrics(
  harvests: Array<{ quantityKg: number; pricePerKg: number }>,
  fieldArea: number,
  costs: number
) {
  const totalProduction = harvests.reduce((sum, h) => sum + h.quantityKg, 0);
  const revenue = harvests.reduce((sum, h) => sum + (h.quantityKg * (h.pricePerKg || 0)), 0);
  const yieldKgPerHa = fieldArea > 0 ? totalProduction / fieldArea : 0;
  const profit = revenue - costs;

  return {
    totalProduction,
    yieldKgPerHa,
    revenue,
    profit,
    profitPerHa: fieldArea > 0 ? profit / fieldArea : 0,
  };
}