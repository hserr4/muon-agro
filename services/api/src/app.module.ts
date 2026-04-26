import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TenantModule } from './tenant/tenant.module';
import { AnimalsModule } from './animals/animals.module';
import { LotsModule } from './lots/lots.module';
import { FieldsModule } from './fields/fields.module';
import { StockModule } from './stock/stock.module';
import { EmployeesModule } from './employees/employees.module';
import { MachinesModule } from './machines/machines.module';
import { CashFlowModule } from './cashflow/cashflow.module';
import { AuditModule } from './audit/audit.module';
import { BillingModule } from './billing/billing.module';
import { NotificationsModule } from './notifications/notifications.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HealthModule } from './health/health.module';
import { RedisModule } from './redis/redis.module';
import { APP_GUARD } from '@nestjs/core';
import { RbacGuard } from './auth/rbac.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RedisModule,
    AuthModule,
    TenantModule,
    AnimalsModule,
    LotsModule,
    FieldsModule,
    StockModule,
    EmployeesModule,
    MachinesModule,
    CashFlowModule,
    AuditModule,
    BillingModule,
    NotificationsModule,
    DashboardModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RbacGuard,
    },
  ],
})
export class AppModule {}