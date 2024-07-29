import { NestFactory } from '@nestjs/core';
import { WriteServiceModule } from './write-service.module';

async function bootstrap() {
  const app = await NestFactory.create(WriteServiceModule);
  await app.listen(3000);
}
bootstrap();
