import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from './posts.entity';
import { BaseEntity } from './BaseEntity';

@Entity('images')
export class Image extends BaseEntity {
  @ManyToOne(() => Post, (post) => post.images)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column()
  url: string;

  @Column()
  path: string;

  @Column()
  filename: string;

  @Column({ nullable: true })
  alt: string;
}
