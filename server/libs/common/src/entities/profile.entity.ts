import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { USER_PROFILE_CONSTANT } from '../constants';
import { Avatar } from './avatar.entity';
import { BaseEntity } from './BaseEntity';
import { User } from './user.entity';

@Entity('profiles')
export class Profile extends BaseEntity {
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: Partial<User>;

  @Column({ nullable: true })
  bio: string;

  @Column({ default: 0 })
  followers: number;

  @Column({ default: 0 })
  following: number;

  @Column({ default: 0 })
  posts: number;

  @Column({ nullable: true })
  name: string;

  @Column({
    type: 'enum',
    enum: [
      USER_PROFILE_CONSTANT.GENDER.FEMALE,
      USER_PROFILE_CONSTANT.GENDER.OTHER,
      USER_PROFILE_CONSTANT.GENDER.MALE,
    ],
    nullable: true,
  })
  gender: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @OneToMany(() => Avatar, (avatar) => avatar.profile)
  avatars: Avatar[];
}
