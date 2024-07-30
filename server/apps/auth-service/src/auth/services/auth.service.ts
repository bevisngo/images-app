import { UserRepository } from '@app/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dtos/login.dto';
import { User } from '@app/common/entities';
import { HashService } from './hash.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  /**
   * Attempts to log in a user with the provided credentials.
   * @param loginDto - The login data containing the username and password.
   * @returns The logged-in user object.
   */
  public async login(loginDto: LoginDto) {
    const existedUser = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });

    if (
      !existedUser ||
      !(await this.hashService.compare(loginDto.password, existedUser.password))
    ) {
      throw new HttpException(
        'Credentials is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    return loginDto;
  }

  /**
   * Registers a new user in the system.
   * @param registerDto - The registration data containing the username and password.
   * @returns The newly created user object.
   */
  public async register(registerDto: RegisterDto) {
    const hashedPassword = await this.hashService.hash(registerDto.password);

    const existedUser = await this.userRepository.findOne({
      where: { username: registerDto.username },
    });

    if (existedUser) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }

    const createdUser = this.userRepository.manager.create(User, {
      username: registerDto.username,
      password: hashedPassword,
    });

    await this.userRepository.manager.save(createdUser);

    return createdUser;
  }
}
