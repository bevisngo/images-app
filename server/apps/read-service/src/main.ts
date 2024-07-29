import { NestFactory } from '@nestjs/core';
import { ReadServiceModule } from './read-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ReadServiceModule);
  await app.listen(3000);
}
bootstrap();
