export type UserRole = 'ADMIN' | 'MANAGER' | 'OPERATOR' | 'VIEWER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tenantId: string;
  isActive: boolean;
}

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  plan: 'BASIC' | 'PROFESSIONAL' | 'ENTERPRISE';
  status: 'ACTIVE' | 'PAST_DUE' | 'CANCELLED' | 'SUSPENDED' | 'TRIALING';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface DashboardMetrics {
  animalCount: number;
  lotCount: number;
  fieldCount: number;
  employeeCount: number;
  machineCount: number;
  revenue: number;
  expense: number;
  profit: number;
  averageWeight: number;
  totalWeight: number;
  occupancyRate: number;
  averageDailyGain: number;
}

export interface PlanFeatures {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  maxAnimals: number;
  maxFields: number;
  maxUsers: number;
  features: string[];
}