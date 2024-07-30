import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginDto, RegisterDto } from './dtos/auth.dto';

@UsePipes(new ValidationPipe({ whitelist: true }))
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
}
