import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './users.entity';
import { Post } from './posts.entity';
import { BaseEntity } from './BaseEntity';

@Entity('post_collaborators')
export class PostCollaborator extends BaseEntity {
  @ManyToOne(() => Post, (post) => post.collaborators)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User, (user) => user.collaborations)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
