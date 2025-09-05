import { CreateUserDto } from '../../../src/modules/user/dtos/create-user.dto';
import { UserRole } from '../../../src/shared/utils/userRole/userRole';
import {
  TEST_EMAILS,
  TEST_USER_DATA,
  TEST_PASSWORDS,
} from '../../config/test-constants';

export const createUserMock = (): CreateUserDto => {
  return {
    name: TEST_USER_DATA.NAME,
    email: TEST_EMAILS.DEFAULT_USER,
    password: TEST_PASSWORDS.CREATE_USER,
    confirmPassword: TEST_PASSWORDS.CREATE_USER,
    type: UserRole.USER,
  };
};
