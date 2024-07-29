import { Controller, Get } from '@nestjs/common';
import { WriteServiceService } from './write-service.service';

@Controller()
export class WriteServiceController {
  constructor(private readonly writeServiceService: WriteServiceService) {}

  @Get()
  getHello(): string {
    return this.writeServiceService.getHello();
  }
}
