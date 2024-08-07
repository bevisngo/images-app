import { Module } from '@nestjs/common';
import { ImageProcessingController } from './controllers/image-processing.controller';
import { imageProcessingService } from './services/image-processing.service';
import { RedisQueueModule } from '@app/common';
import { ImageProcessingProcessor } from './processors/image-processing.processor';

@Module({
  imports: [RedisQueueModule],
  controllers: [ImageProcessingController],
  providers: [imageProcessingService, ImageProcessingProcessor],
})
export class ImageProcessingModule {}
