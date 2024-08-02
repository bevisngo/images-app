import { DatabaseModule, RepositoryModule } from '@app/common';
import { SERVICE } from '@app/common/constants';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UploadModule } from './domains/upload/upload.module';
import { S3Module } from '@app/common/aws';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    RepositoryModule,
    S3Module,
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

    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class WriteServiceModule {}
