import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './BaseEntity';

@Entity('follows')
export class Follow extends BaseEntity {
  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'follower_id' })
  follower: User;

  @ManyToOne(() => User, (user) => user.followings)
  @JoinColumn({ name: 'following_id' })
  following: User;
}
