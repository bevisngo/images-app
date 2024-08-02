import { ProfileRepository } from '@app/common';
import { User } from '@app/common/entities';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ProfileService {
  private _logger = new Logger();
  constructor(private readonly profileRepository: ProfileRepository) {}

  public async getProfile(user: User) {
    const profile = await this.profileRepository.findOne({
      where: { user: { id: user.id } },
    });
    if (!profile) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return profile;
  }
}
