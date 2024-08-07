import { Module } from '@nestjs/common';
import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';
import { ImageProcessingModule } from './domains/image-processing/image-processing.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Module } from '@app/common/aws';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    S3Module,
    ImageProcessingModule,
  ],
  controllers: [ConsumerController],
  providers: [ConsumerService],
})
export class ConsumerModule {}
