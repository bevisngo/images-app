import { NestFactory } from '@nestjs/core';
import { ReadServiceModule } from './read-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ReadServiceModule);
  app.setGlobalPrefix('api');
  await app.listen(3002);
}
bootstrap();
