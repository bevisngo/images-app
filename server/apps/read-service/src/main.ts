import { NestFactory } from '@nestjs/core';
import { ReadServiceModule } from './read-service.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ReadServiceModule);
  app.setGlobalPrefix('api');

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(3002);
}
bootstrap();
