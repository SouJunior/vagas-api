import { LoginTypeEnum } from '../../../src/modules/auth/enums/login-type.enum';
import { UserLoginDto } from '../../../src/modules/auth/dtos/user-login.dto';
import { TEST_PASSWORDS, TEST_EMAILS } from '../../config/test-constants';

export const userLoginMock = (): UserLoginDto => {
  return {
    email: TEST_EMAILS.DEFAULT_USER,
    password: TEST_PASSWORDS.VALID_LOGIN,
    type: LoginTypeEnum.USER,
  };
};

export const companyLoginMock = (): UserLoginDto => {
  return {
    email: TEST_EMAILS.COMPANY,
    password: TEST_PASSWORDS.VALID_LOGIN,
    type: LoginTypeEnum.COMPANY,
  };
};

export const invalidUserLoginMock = (): UserLoginDto => {
  return {
    email: TEST_EMAILS.INVALID,
    password: TEST_PASSWORDS.INVALID_LOGIN,
    type: LoginTypeEnum.USER,
  };
};

export const userWithUnconfirmedEmailMock = (): UserLoginDto => {
  return {
    email: TEST_EMAILS.UNCONFIRMED_COMPANY,
    password: TEST_PASSWORDS.VALID_LOGIN,
    type: LoginTypeEnum.USER,
  };
};
