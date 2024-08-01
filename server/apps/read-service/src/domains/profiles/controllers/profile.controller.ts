import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { JwtAuthGuard } from '@app/common/auth';

// @UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async gerProfileDetail() {
    return 'get profile api from read service';
  }
}
