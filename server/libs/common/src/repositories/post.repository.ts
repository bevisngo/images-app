import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities';
import { GenericRepository } from './base.repository.generic';

@Injectable()
export class PostRepository extends GenericRepository<Post> {
  constructor(@InjectRepository(Post) repository: Repository<Post>) {
    super(repository);
  }
}
