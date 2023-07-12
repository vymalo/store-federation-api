import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { mw } from 'request-ip';
import * as cors from 'cors';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap(port = process.env.PORT || 3000) {
  const startTime = new Date().getTime();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', 1);

  app.use(mw());
  app.use(cors());
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'default-src': "'self' http: https:",
          'img-src': "'self' http: https: data:",
          'script-src': "'self' 'unsafe-inline' http: https: data:",
        },
      },
    }),
  );

  app.enableCors();

  await app.listen(port, () => {
    const now = new Date().getTime();
    Logger.log(`Started in ${now - startTime}ms`, 'App');
    Logger.log(`🎸 Running at http://localhost:${port}`, 'App');
    Logger.log(`♥️ Running at http://localhost:${port}/health`, 'App');
    Logger.log(`🤣 Running at http://localhost:${port}/graphql`, 'App');
  });
}
bootstrap();
