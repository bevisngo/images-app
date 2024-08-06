import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Avatar,
  Comment,
  Image,
  Like,
  Post,
  PostCollaborator,
  PostSaved,
  User,
} from '../entities';
import { UserRepository } from './user.repository';
import { Profile } from '../entities/profile.entity';
import { Setting } from '../entities/setting.entity';
import { Follow } from '../entities/follow.entity';
import { ProfileRepository } from './profile.repository';
import { SettingRepository } from './setting.repository';
import { AvatarRepository } from './avatar.repository';
import { PostRepository } from './post.repository';
import { ImageRepository } from './image.repository';

const providers = [
  UserRepository,
  ProfileRepository,
  SettingRepository,
  AvatarRepository,
  PostRepository,
  ImageRepository,
];

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Profile,
      Setting,
      Follow,
      Avatar,
      Image,
      Post,
      Comment,
      Like,
      PostCollaborator,
      PostSaved,
    ]),
  ],
  providers: providers,
  exports: providers,
})
export class RepositoryModule {}
