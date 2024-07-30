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
import { Profile } from '../entities/profiles.entity';
import { Setting } from '../entities/settings.entity';
import { Follow } from '../entities/follows.entity';

const providers = [UserRepository];

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
