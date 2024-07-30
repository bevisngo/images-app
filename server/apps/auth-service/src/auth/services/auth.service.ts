import { UserRepository } from '@app/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dtos/auth.dto';
import { User } from '@app/common/entities';
import { HashService } from './hash.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../strategies/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Attempts to log in a user with the provided credentials.
   * @param loginDto - The login data containing the username and password.
   * @returns The logged-in user object.
   */
  public async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });

    if (
      !user ||
      !(await this.hashService.compare(loginDto.password, user.password))
    ) {
      throw new HttpException(
        'Credentials is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    delete user.password;

    const payload = this._generateTokenPayload(user);
    const accessToken = await this._generateAccessToken(payload);

    return {
      user,
      accessToken,
    };
  }

  /**
   * Registers a new user in the system.
   * @param registerDto - The registration data containing the username and password.
   * @returns The newly created user object.
   */
  public async register(registerDto: RegisterDto) {
    const existedUser = await this.userRepository.findOne({
      where: { username: registerDto.username },
    });

    if (existedUser) {
      throw new HttpException('Username already taken', HttpStatus.CONFLICT);
    }

    const hashedPassword = await this.hashService.hash(registerDto.password);

    const createdUser = await this.userRepository.create({
      username: registerDto.username,
      password: hashedPassword,
    });

    delete createdUser.password;

    const payload = this._generateTokenPayload(createdUser);
    const accessToken = await this._generateAccessToken(payload);

    return {
      user: createdUser,
      accessToken,
    };
  }

  private _generateTokenPayload(user: User): JwtPayload {
    return {
      username: user.username,
      id: user.id,
    };
  }

  private async _generateAccessToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<number>('JWT_EXPIRE_IN') + 'd',
    });
  }
}
