import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { BaseEntity } from './BaseEntity';

@Entity('comments')
export class Comment extends BaseEntity {
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => Post, (post) => post.postComments)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column()
  content: string;
}
