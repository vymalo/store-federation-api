import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'cms',
          this.configService.get<string>('CMS_API') + '/health',
        ),
      () =>
        this.http.pingCheck(
          'saleor',
          this.configService.get<string>('SALEOR_API') + '/health/',
        ),
    ]);
  }
}
