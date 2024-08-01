import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Image } from './image.entity';
import { Profile } from './profile.entity';

@Entity('avatars')
export class Avatar extends BaseEntity {
  @OneToOne(() => Profile, (profile) => profile.avatar)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @ManyToOne(() => Image, (image) => image.id)
  @JoinColumn({ name: 'image_id' })
  image: Image;
}
