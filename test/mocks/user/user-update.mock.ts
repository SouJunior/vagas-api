import {
  TEST_EMAILS,
  TEST_USER_DATA,
  TEST_PASSWORDS,
} from '../../config/test-constants';

export const userUpdateMock = () => {
  return {
    name: TEST_USER_DATA.NAME,
    email: TEST_EMAILS.DEFAULT_USER,
    cpf: TEST_USER_DATA.CPF,
    password: TEST_PASSWORDS.GENERIC,
  };
};
