import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() user: any) {
    return this.authService.login(user);
  }

  @Public()
  @Post('register')
  async register(@Body() user: any) {
    // Implement register logic here
    return { message: 'User registered successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  public async authenticate(@Payload() payload: any) {
    return payload.user;
  }
} 
