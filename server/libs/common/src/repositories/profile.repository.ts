import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities';
import { GenericRepository } from './base.repository.generic';

@Injectable()
export class ProfileRepository extends GenericRepository<Profile> {
  constructor(@InjectRepository(Profile) repository: Repository<Profile>) {
    super(repository);
  }
}
