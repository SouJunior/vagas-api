import { UserRole } from '../../../src/shared/utils/userRole/userRole';
import {
  TEST_IDS,
  TEST_EMAILS,
  TEST_USER_DATA,
  TEST_PASSWORDS,
  TEST_TOKENS,
} from '../../config/test-constants';

export const userMock = () => {
  return {
    id: TEST_IDS.USER_ID,
    name: TEST_USER_DATA.NAME,
    email: TEST_EMAILS.DEFAULT_USER,
    cpf: TEST_USER_DATA.CPF,
    policies: true,
    created_at: '2023-02-21T00:25:07.000Z',
    updated_at: '2023-02-21T00:25:07.000Z',
  };
};

export const userUpdateRecoveryMock = () => {
  return {
    id: TEST_IDS.USER_ID,
    name: TEST_USER_DATA.NAME,
    email: TEST_EMAILS.DEFAULT_USER,
    cpf: TEST_USER_DATA.CPF,
    policies: true,
    created_at: '2023-02-21T00:25:07.000Z',
    updated_at: '2023-02-21T00:25:07.000Z',
    recoverPasswordToken: TEST_TOKENS.RECOVERY_TOKEN,
  };
};

export const userEntityMock = () => {
  return {
    id: TEST_IDS.USER_ID,
    name: TEST_USER_DATA.NAME,
    email: TEST_EMAILS.DEFAULT_USER,
    cpf: TEST_USER_DATA.CPF,
    personal_data: null,
    policies: true,
    password: TEST_PASSWORDS.BASIC,
    type: UserRole.USER,
    created_at: new Date(),
    updated_at: new Date(),
  };
};
