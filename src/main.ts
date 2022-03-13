import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { isDev, port } from './@seedwork/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      preflightContinue: true,
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet({ contentSecurityPolicy: isDev ? false : undefined }));

  await app.listen(port);
}
bootstrap();
