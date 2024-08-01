import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './domains/auth/auth.module';
import { DatabaseModule, RepositoryModule } from '@app/common';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    RepositoryModule,
  ],
})
export class AuthServiceModule {}
