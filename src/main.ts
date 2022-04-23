import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ResponseFormatterInterceptor } from 'src/common/interceptors/response-formatter.interceptor';
import { Logger } from 'src/common/utils/logger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseFormatterInterceptor());
  app.setGlobalPrefix('/api/v1');
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
