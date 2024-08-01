import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly _logger = new Logger(JwtAuthGuard.name);
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(
    request: Request & { authorization: string },
  ): string | undefined {
    const tokenStr =
      request?.cookies?.authorization ||
      request?.authorization ||
      request?.headers?.authorization;

    this._logger.debug(`Extracting token from ${tokenStr}`);

    const [type, token] = tokenStr?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
