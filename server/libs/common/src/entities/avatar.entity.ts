import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Image } from './image.entity';
import { Profile } from './profile.entity';

@Entity('avatars')
export class Avatar extends BaseEntity {
  @ManyToOne(() => Profile, (profile) => profile.avatars)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @Column()
  url: string;

  @Column()
  path: string;

  @Column()
  filename: string;

  @Column({ default: true })
  isUsing: boolean;
}
