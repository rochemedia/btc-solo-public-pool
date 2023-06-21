import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true
    }),
  );
  app.enableCors();

  await app.listen(process.env.PORT);
  console.log(`http listening on port ${process.env.PORT}`)
}
bootstrap();
