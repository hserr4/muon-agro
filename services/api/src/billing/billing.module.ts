import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { StripeModule } from './stripe.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ConfigModule, StripeModule, PrismaModule],
  controllers: [BillingController],
  providers: [BillingService],
  exports: [BillingService],
})
export class BillingModule {}