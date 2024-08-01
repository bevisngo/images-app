import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './BaseEntity';
import { USER_SETTING_CONSTANT } from '../constants';

@Entity('settings')
export class Setting extends BaseEntity {
  @OneToOne(() => User, (user) => user.setting)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'json', nullable: true })
  recent_searches: string;

  @Column({
    type: 'enum',
    enum: [
      USER_SETTING_CONSTANT.TYPE.PRIVATE,
      USER_SETTING_CONSTANT.TYPE.PUBLIC,
    ],
    default: USER_SETTING_CONSTANT.TYPE.PUBLIC,
  })
  type: string;
}
