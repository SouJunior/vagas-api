import { TEST_EMAILS, TEST_IDS } from '../../config/test-constants';

export const jwtPayloadMock = () => {
  return {
    sub: TEST_IDS.USER_ID,
    email: TEST_EMAILS.DEFAULT_USER,
    type: 'USER',
    iat: 1640995200,
    exp: 1641081600,
  };
};

export const companyJwtPayloadMock = () => {
  return {
    sub: TEST_IDS.COMPANY_ID,
    email: TEST_EMAILS.COMPANY,
    type: 'COMPANY',
    iat: 1640995200,
    exp: 1641081600,
  };
};

export const invalidJwtPayloadMock = () => {
  return {
    sub: '999c7919-583c-40a5-b0ca-137e282345d9',
    email: TEST_EMAILS.INVALID,
    type: 'USER',
    iat: 1640995200,
    exp: 1641081600,
  };
};
