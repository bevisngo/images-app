import { Controller, Get } from '@nestjs/common';
import { ReadServiceService } from './read-service.service';

@Controller()
export class ReadServiceController {
  constructor(private readonly readServiceService: ReadServiceService) {}

  @Get()
  getHello(): string {
    return this.readServiceService.getHello();
  }
}
