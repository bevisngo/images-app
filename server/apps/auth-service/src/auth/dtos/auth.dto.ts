import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  Validate,
} from 'class-validator';
import { IsEqualTo } from './validators/is-equal-to.validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @IsEqualTo('password')
  confirmPassword: string;
}
