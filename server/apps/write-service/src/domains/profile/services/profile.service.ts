import { ProfileRepository } from '@app/common';
import { User } from '@app/common/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateAvatarDto, UpdateProfileDto } from '../dtos/profile.dto';
import { Equal, Not } from 'typeorm';
import { AvatarRepository } from '@app/common/repositories/avatar.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly avatarRepository: AvatarRepository,
  ) {}

  public async updateProfile(user: User, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    if (!profile) {
      throw new HttpException('User was not found.', HttpStatus.NOT_FOUND);
    }

    if (updateProfileDto.username) {
      const existedUsername = await this.profileRepository.findOne({
        where: {
          user: {
            id: Not(user.id),
          },
          username: updateProfileDto.username,
        },
      });
      if (existedUsername) {
        throw new HttpException(
          'Username already exists.',
          HttpStatus.CONFLICT,
        );
      }
    }

    const profilePayload = {
      ...profile,
      ...updateProfileDto,
    };

    const updatedProfile = await this.profileRepository.update(profilePayload);

    return updatedProfile;
  }

  // update avatar

  public async updateAvatar(user: User, updateAvatarDto: UpdateAvatarDto) {
    const profile = await this.profileRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    if (!profile) {
      throw new HttpException('User was not found.', HttpStatus.NOT_FOUND);
    }

    await this.avatarRepository.updateMany(
      {
        profile: {
          id: profile.id,
        },
      },
      {
        isUsing: false,
      },
    );

    const avatar = await this.avatarRepository.create({
      ...updateAvatarDto,
      profile,
    });

    return avatar;
  }
}
