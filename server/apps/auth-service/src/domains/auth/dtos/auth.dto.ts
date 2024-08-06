import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { IsEqualTo } from './validators/is-equal-to.validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @IsEqualTo('password')
  confirmPassword: string;
}
