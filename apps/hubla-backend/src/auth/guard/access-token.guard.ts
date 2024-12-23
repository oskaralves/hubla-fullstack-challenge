// NestJS
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorator/is-public.decorator';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const canActivate = super.canActivate(context);
    if (typeof canActivate === 'boolean') {
      return canActivate;
    }
    const canActivatePromise = canActivate as Promise<boolean>;
    return canActivatePromise
      .then(() => {
        return true;
      })
      .catch((error) => {
        throw new UnauthorizedException(error?.message || 'Unauthorized');
      });
  }
}
