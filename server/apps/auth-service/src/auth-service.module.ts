import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './domains/post/post.module';
import { AuthModule } from './domains/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PostModule,
  ],
})
export class AuthServiceModule {}
