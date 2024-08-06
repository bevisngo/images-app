import { ProfileRepository } from '@app/common';
import { User } from '@app/common/entities';
import { AvatarRepository } from '@app/common/repositories/avatar.repository';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ProfileService {
  private _logger = new Logger();
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly avatarRepository: AvatarRepository,
  ) {}

  public async getProfile(user: User) {
    const profile = await this.profileRepository.findOne({
      where: { user: { id: user.id } },
    });
    if (!profile) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const avatar = await this.avatarRepository.findOne({
      where: {
        profile: { id: profile.id },
        isUsing: true,
      },
    });

    return {
      ...profile,
      avatar,
    };
  }
}
