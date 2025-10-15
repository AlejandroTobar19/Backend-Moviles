// src/main.ts
import * as dotenv from 'dotenv';
dotenv.config();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
  console.log(`API on http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();
