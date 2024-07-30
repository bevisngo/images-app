import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Profile } from './profiles.entity';
import { Image } from './images.entity';
import { BaseEntity } from './BaseEntity';

@Entity('avatars')
export class Avatar extends BaseEntity {
  @OneToOne(() => Profile, (profile) => profile.avatar)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @ManyToOne(() => Image, (image) => image.id)
  @JoinColumn({ name: 'image_id' })
  image: Image;
}
