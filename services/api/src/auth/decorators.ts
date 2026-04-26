import { SetMetadata } from '@nestjs/common';
import { Permission } from '../auth/permissions';

export const PERMISSIONS_KEY = 'permissions';
export const RequiredPermissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

export const ROLES_KEY = 'roles';
export const RequiredRoles = (...roles: string[]) =>
  SetMetadata(ROLES_KEY, roles);