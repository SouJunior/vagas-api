import { UserResponseLoginTypes } from '../types/user-response-login.types';

export class UserLoginResponseDto {
  token: string;
  user: UserResponseLoginTypes;
}
