import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from 'src/shared/utils/userRole/userRole';

export const LoggedUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const userObject = request.user;

  if (userObject.type === UserRole.USER || userObject.type === UserRole.ADMIN) {
    delete userObject.passwordHash;

    return userObject;
  } else {
    throw new UnauthorizedException(
      'User does not have permission to access this route',
    );
  }
});
