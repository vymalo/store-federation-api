import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GatewayModule,
    HealthModule,
  ],
})
export class AppModule {}
