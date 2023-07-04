import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const LoggedCompany = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userObject = request.user;

    if (!userObject) {
      throw new UnauthorizedException(
        'Company does not have permission to access this route',
      );
    }

    return userObject;
  },
);
