import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../entities';
import { GenericRepository } from './base.repository.generic';

@Injectable()
export class ImageRepository extends GenericRepository<Image> {
  constructor(@InjectRepository(Image) repository: Repository<Image>) {
    super(repository);
  }
}
