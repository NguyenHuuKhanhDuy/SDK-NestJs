import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUserDto } from '@src/common/models';

export const CurrentUser = createParamDecorator(
  (data: keyof JwtUserDto | undefined, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtUserDto;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);
