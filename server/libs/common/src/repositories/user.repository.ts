import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { GenericRepository } from './base.repository.generic';

@Injectable()
export class UserRepository extends GenericRepository<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }
}
