import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avatar } from '../entities';
import { GenericRepository } from './base.repository.generic';

@Injectable()
export class AvatarRepository extends GenericRepository<Avatar> {
  constructor(@InjectRepository(Avatar) repository: Repository<Avatar>) {
    super(repository);
  }
}
