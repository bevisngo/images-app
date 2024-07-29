import { Module } from '@nestjs/common';
import { ReadServiceController } from './read-service.controller';
import { ReadServiceService } from './read-service.service';

@Module({
  imports: [],
  controllers: [ReadServiceController],
  providers: [ReadServiceService],
})
export class ReadServiceModule {}
