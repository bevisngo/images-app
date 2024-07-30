import { Module } from '@nestjs/common';
import { DatabaseModule, RepositoryModule } from '@app/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, RepositoryModule, AuthModule],
})
export class AuthServiceModule {}
