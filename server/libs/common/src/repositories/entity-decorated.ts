import { Entity } from 'typeorm';
import { BaseEntity } from '../entities/BaseEntity';

@Entity()
export abstract class EntityDecorated extends BaseEntity {}
