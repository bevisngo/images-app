import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from '../entities';
import { GenericRepository } from './base.repository.generic';

@Injectable()
export class SettingRepository extends GenericRepository<Setting> {
  constructor(@InjectRepository(Setting) repository: Repository<Setting>) {
    super(repository);
  }
}
