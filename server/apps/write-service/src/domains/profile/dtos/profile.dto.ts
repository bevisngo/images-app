import { USER_PROFILE_CONSTANT } from '@app/common/constants';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  bio: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsIn([
    USER_PROFILE_CONSTANT.GENDER.FEMALE,
    USER_PROFILE_CONSTANT.GENDER.MALE,
    USER_PROFILE_CONSTANT.GENDER.OTHER,
  ])
  @IsOptional()
  @IsNotEmpty()
  gender: string;
}

export class UpdateAvatarDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}
