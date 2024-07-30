import { Entity, Column, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Profile } from './profiles.entity';
import { Setting } from './settings.entity';
import { Follow } from './follows.entity';
import { Post } from './posts.entity';
import { Like } from './likes.entity';
import { PostSaved } from './posts-saved.entity';
import { PostCollaborator } from './post-collaborators.entity';
import { Comment } from './comments.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToOne(() => Setting, (setting) => setting.user)
  setting: Setting;

  @OneToMany(() => Follow, (follow) => follow.follower)
  followers: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following)
  followings: Follow[];

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => PostSaved, (postSaved) => postSaved.user)
  savedPosts: PostSaved[];

  @OneToMany(
    () => PostCollaborator,
    (postCollaborator) => postCollaborator.user,
  )
  collaborations: PostCollaborator[];
}
