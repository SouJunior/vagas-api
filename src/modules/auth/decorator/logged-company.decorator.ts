import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';

export const LoggedCompany = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const userObject = request.user;

  if (!userObject) {
    return userObject;
  } else {
    throw new UnauthorizedException(
      'User does not have permission to access this route',
    );
  }
});
