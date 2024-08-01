import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { JwtAuthGuard } from '@app/common/auth';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { User } from '@app/common/entities';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  public async gerProfileDetail(@CurrentUser() user: User) {
    return user;
  }
}
