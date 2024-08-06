import { Controller, Get } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Get()
  getHello(): string {
    return this.consumerService.getHello();
  }
}
