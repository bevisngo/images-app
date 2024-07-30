import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities';
import { UserRepository } from './user.repository';

const providers = [UserRepository];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: providers,
  exports: providers,
})
export class RepositoryModule {}
