import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LoginDto, RegisterDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  public async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  public async authenticate(@Payload() payload: any) {
    return payload.user;
  }
}
