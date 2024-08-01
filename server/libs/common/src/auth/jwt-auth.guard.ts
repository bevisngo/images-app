import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { SERVICE } from '../constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly _logger = new Logger(JwtAuthGuard.name);

  constructor(
    @Inject(SERVICE.AUTH_SERVICE) private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // get jwt string from request
    const request = context.switchToHttp().getRequest();
    const jwt =
      request.cookies?.authorization || request.headers?.authorization;
    if (!jwt) return false;

    this._logger.debug(`canActivate: ${jwt}`);

    // send jwt token to auth service to validate
    return this.authClient.send<boolean>('authenticate', {
      authorization: jwt,
    });
  }
}
