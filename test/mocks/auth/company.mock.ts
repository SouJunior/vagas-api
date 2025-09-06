import {
  TEST_IDS,
  TEST_EMAILS,
  TEST_COMPANY_DATA,
  TEST_PASSWORDS,
  TEST_USER_DATA,
} from '../../config/test-constants';

const getTestPassword = () => {
  try {
    return TEST_PASSWORDS.HASHED_BCRYPT;
  } catch (error) {
    return (
      TEST_PASSWORDS.HASHED ||
      '$2b$10$K8gF4Z.vH5P.qL2N3mR8qOzGJ5jH9xW2pM6rQ7sT4uV8yA3bC1dE6'
    );
  }
};

export const companyEntityMock = () => {
  return {
    id: TEST_IDS.COMPANY_ID,
    companyName: TEST_COMPANY_DATA.NAME,
    email: TEST_EMAILS.COMPANY,
    password: getTestPassword(),
    cnpj: TEST_COMPANY_DATA.CNPJ,
    about: 'A test company for unit tests',
    phone: TEST_USER_DATA.PHONE,
    address: 'Test Street, 123',
    city: 'Test City',
    state: 'Test State',
    cep: '12345-678',
    companySite: 'https://testcompany.com',
    mailConfirm: true,
    policies: true,
    recoverPasswordToken: null,
    ip: '127.0.0.1',
    created_at: '2023-02-21T00:25:07.000Z',
    updated_at: '2023-02-21T00:25:07.000Z',
  };
};

export const publicCompanyMock = () => {
  return {
    id: TEST_IDS.COMPANY_ID,
    companyName: TEST_COMPANY_DATA.NAME,
    email: TEST_EMAILS.COMPANY,
    cnpj: TEST_COMPANY_DATA.CNPJ,
    about: 'A test company for unit tests',
    phone: TEST_USER_DATA.PHONE,
    address: 'Test Street, 123',
    city: 'Test City',
    state: 'Test State',
    cep: '12345-678',
    companySite: 'https://testcompany.com',
    mailConfirm: true,
    policies: true,
    created_at: '2023-02-21T00:25:07.000Z',
    updated_at: '2023-02-21T00:25:07.000Z',
  };
};

export const companyWithUnconfirmedEmailMock = () => {
  return {
    ...companyEntityMock(),
    id: '829c7919-583c-40a5-b0ca-137e282345d5',
    companyName: 'Unconfirmed Company Ltd',
    email: TEST_EMAILS.UNCONFIRMED_COMPANY,
    cnpj: TEST_COMPANY_DATA.UNCONFIRMED_CNPJ,
    mailConfirm: false,
  };
};
