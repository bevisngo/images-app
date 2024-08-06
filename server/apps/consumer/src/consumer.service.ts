import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsumerService {
  getHello(): string {
    return 'Hello World!';
  }
}
