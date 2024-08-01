import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  findAll() {
    return [{ id: 1, title: 'First Post' }, { id: 2, title: 'Second Post' }];
  }
}