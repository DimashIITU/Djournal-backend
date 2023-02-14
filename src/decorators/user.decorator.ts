import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntitly } from 'src/user/entities/user.entity';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): UserEntitly => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.userId;
  },
);
