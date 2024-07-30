import { DatabaseModule, RepositoryModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthConfigModule } from './config/config.module';

@Module({
  imports: [
    DatabaseModule,
    RepositoryModule,
    AuthConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
})
export class AuthServiceModule {}
