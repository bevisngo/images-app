import { Module } from '@nestjs/common';
import { WriteServiceController } from './write-service.controller';
import { WriteServiceService } from './write-service.service';

@Module({
  imports: [],
  controllers: [WriteServiceController],
  providers: [WriteServiceService],
})
export class WriteServiceModule {}
