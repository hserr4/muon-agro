import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'STRIPE_KEY',
      useFactory: (config: any) => config.get('STRIPE_SECRET_KEY', 'sk_test_placeholder'),
      inject: [ConfigService],
    },
  ],
  exports: ['STRIPE_KEY'],
})
export class StripeModule {}