import { Injectable } from '@nestjs/common';

@Injectable()
export class ReadServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
