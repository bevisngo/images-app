import {
  DatabaseModule,
  RedisQueueModule,
  RepositoryModule,
} from '@app/common';
import { S3Module } from '@app/common/aws';
import { SERVICE } from '@app/common/constants';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostModule } from './domains/posts/post.module';
import { ProfileModule } from './domains/profile/profile.module';
import { UploadModule } from './domains/upload/upload.module';

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
    PostModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class WriteServiceModule {}
