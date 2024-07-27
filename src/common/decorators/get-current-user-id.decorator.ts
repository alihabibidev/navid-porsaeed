import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../module/auth/types';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    console.log(request.user);

    const user = request.user as JwtPayload;
    return user.id;
  },
);
