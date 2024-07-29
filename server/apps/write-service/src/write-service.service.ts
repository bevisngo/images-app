import { Injectable } from '@nestjs/common';

@Injectable()
export class WriteServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
