export enum Permission {
  // Animals
  ANIMAL_CREATE = 'animal:create',
  ANIMAL_READ = 'animal:read',
  ANIMAL_UPDATE = 'animal:update',
  ANIMAL_DELETE = 'animal:delete',
  
  // Lots
  LOT_CREATE = 'lot:create',
  LOT_READ = 'lot:read',
  LOT_UPDATE = 'lot:update',
  LOT_DELETE = 'lot:delete',
  
  // Fields
  FIELD_CREATE = 'field:create',
  FIELD_READ = 'field:read',
  FIELD_UPDATE = 'field:update',
  FIELD_DELETE = 'field:delete',
  
  // Stock
  STOCK_CREATE = 'stock:create',
  STOCK_READ = 'stock:read',
  STOCK_UPDATE = 'stock:update',
  STOCK_DELETE = 'stock:delete',
  
  // Employees
  EMPLOYEE_CREATE = 'employee:create',
  EMPLOYEE_READ = 'employee:read',
  EMPLOYEE_UPDATE = 'employee:update',
  EMPLOYEE_DELETE = 'employee:delete',
  
  // Machines
  MACHINE_CREATE = 'machine:create',
  MACHINE_READ = 'machine:read',
  MACHINE_UPDATE = 'machine:update',
  MACHINE_DELETE = 'machine:delete',
  
  // CashFlow
  CASHFLOW_CREATE = 'cashflow:create',
  CASHFLOW_READ = 'cashflow:read',
  CASHFLOW_UPDATE = 'cashflow:update',
  
  // Reports
  REPORT_READ = 'report:read',
  
  // Users (admin)
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  
  // Tenant (admin)
  TENANT_READ = 'tenant:read',
  TENANT_UPDATE = 'tenant:update',
  TENANT_DELETE = 'tenant:delete',
  
  // Billing (admin)
  BILLING_READ = 'billing:read',
  BILLING_UPDATE = 'billing:update',
}

export const RolePermissions: Record<string, Permission[]> = {
  ADMIN: Object.values(Permission),
  MANAGER: [
    Permission.ANIMAL_CREATE,
    Permission.ANIMAL_READ,
    Permission.ANIMAL_UPDATE,
    Permission.LOT_CREATE,
    Permission.LOT_READ,
    Permission.LOT_UPDATE,
    Permission.FIELD_CREATE,
    Permission.FIELD_READ,
    Permission.FIELD_UPDATE,
    Permission.STOCK_CREATE,
    Permission.STOCK_READ,
    Permission.STOCK_UPDATE,
    Permission.EMPLOYEE_CREATE,
    Permission.EMPLOYEE_READ,
    Permission.EMPLOYEE_UPDATE,
    Permission.MACHINE_CREATE,
    Permission.MACHINE_READ,
    Permission.MACHINE_UPDATE,
    Permission.CASHFLOW_CREATE,
    Permission.CASHFLOW_READ,
    Permission.CASHFLOW_UPDATE,
    Permission.REPORT_READ,
  ],
  OPERATOR: [
    Permission.ANIMAL_CREATE,
    Permission.ANIMAL_READ,
    Permission.ANIMAL_UPDATE,
    Permission.LOT_READ,
    Permission.FIELD_READ,
    Permission.STOCK_CREATE,
    Permission.STOCK_READ,
    Permission.STOCK_UPDATE,
    Permission.EMPLOYEE_READ,
    Permission.MACHINE_READ,
    Permission.CASHFLOW_CREATE,
    Permission.CASHFLOW_READ,
  ],
  VIEWER: [
    Permission.ANIMAL_READ,
    Permission.LOT_READ,
    Permission.FIELD_READ,
    Permission.STOCK_READ,
    Permission.EMPLOYEE_READ,
    Permission.MACHINE_READ,
    Permission.CASHFLOW_READ,
    Permission.REPORT_READ,
  ],
};

export function hasPermission(role: string, permission: Permission): boolean {
  const permissions = RolePermissions[role];
  return permissions?.includes(permission) ?? false;
}

export function hasAnyPermission(role: string, permissions: Permission[]): boolean {
  return permissions.some(p => hasPermission(role, p));
}

export function hasAllPermissions(role: string, permissions: Permission[]): boolean {
  return permissions.every(p => hasPermission(role, p));
}