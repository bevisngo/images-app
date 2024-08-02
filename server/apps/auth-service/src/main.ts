import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthServiceModule } from './auth-service.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.setGlobalPrefix('api');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: +configService.get<number>('AUTH_SERVICE_TCP_PORT'),
    },
  });

  await app.startAllMicroservices();

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, 
  });

  await app.listen(configService.get('AUTH_SERVICE_HTTP_PORT'));
}
bootstrap();
