import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequestDto } from '../dto/auth-request.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<AuthRequestDto>();
    return { user: request?.user };
  },
);
