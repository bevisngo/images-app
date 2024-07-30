import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar?: string;
}
