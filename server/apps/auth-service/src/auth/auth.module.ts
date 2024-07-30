import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { HashService } from './services/hash.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, HashService],
})
export class AuthModule {}