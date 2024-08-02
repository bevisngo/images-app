import { Module } from '@nestjs/common';
import { ProfileModule } from './domains/profiles/profile.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE } from '@app/common/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule, RepositoryModule } from '@app/common';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // put your validation here
      }),
    }),
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: SERVICE.AUTH_SERVICE,
          useFactory: (configService: ConfigService) => ({
            transport: Transport.TCP,
            options: {
              host: configService.get('AUTH_SERVICE_HOST'),
              port: configService.get('AUTH_SERVICE_TCP_PORT'),
            },
          }),
          inject: [ConfigService],
        },
      ],
    }),
    DatabaseModule,
    RepositoryModule,
    ProfileModule,
  ],
})
export class ReadServiceModule {}
