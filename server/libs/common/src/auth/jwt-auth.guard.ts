import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { SERVICE } from '../constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly _logger = new Logger(JwtAuthGuard.name);

  constructor(
    @Inject(SERVICE.AUTH_SERVICE) private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt =
      request.cookies?.authorization || request.headers?.authorization;
    if (!jwt) return false;
    try {
      const user = await lastValueFrom(
        this.authClient.send<boolean>('authenticate', {
          authorization: jwt,
        }),
      );
      if (user) {
        context.switchToHttp().getRequest().user = user;
        return true;
      }
      return false;
    } catch (err) {
      console.error('Authentication error:', err);
      return false;
    }
  }
}
