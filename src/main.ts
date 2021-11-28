import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ResponseFormatterInterceptor } from 'src/common/interceptors/response-formatter.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseFormatterInterceptor());
  app.setGlobalPrefix('/api/v1');
  await app.listen(3000);
}
bootstrap();
