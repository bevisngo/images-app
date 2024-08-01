import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { BaseEntity } from './BaseEntity';

@Entity('posts_saved')
export class PostSaved extends BaseEntity {
  @ManyToOne(() => User, (user) => user.savedPosts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.id)
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
