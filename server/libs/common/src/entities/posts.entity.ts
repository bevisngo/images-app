import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Comment } from './comments.entity';
import { Image } from './images.entity';
import { Like } from './likes.entity';
import { PostCollaborator } from './post-collaborators.entity';
import { User } from './users.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ length: 200 })
  caption: string;

  @Column({ type: 'float', nullable: true })
  lat: number;

  @Column({ type: 'float', nullable: true })
  long: number;

  @Column({ default: 0 })
  comments: number;

  @OneToMany(() => Image, (image) => image.post)
  images: Image[];

  @OneToMany(() => Comment, (comment) => comment.post)
  postComments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @OneToMany(
    () => PostCollaborator,
    (postCollaborator) => postCollaborator.post,
  )
  collaborators: PostCollaborator[];
}
