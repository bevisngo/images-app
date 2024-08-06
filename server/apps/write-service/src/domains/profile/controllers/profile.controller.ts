import { JwtAuthGuard } from '@app/common/auth';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { User } from '@app/common/entities';
import {
  Body,
  Controller,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { UpdateAvatarDto, UpdateProfileDto } from '../dtos/profile.dto';

@UsePipes(new ValidationPipe({ whitelist: true }))
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put()
  public async updateProfile(
    @CurrentUser() user: User,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return await this.profileService.updateProfile(user, updateProfileDto);
  }

  @Put('avatar')
  public async updateAvatar(
    @CurrentUser() user: User,
    @Body() updateAvatarDto: UpdateAvatarDto,
  ) {
    return await this.profileService.updateAvatar(user, updateAvatarDto);
  }
}
