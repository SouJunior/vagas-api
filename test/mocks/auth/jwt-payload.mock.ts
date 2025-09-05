import { TEST_EMAILS } from '../../config/test-constants';

export const jwtPayloadMock = () => {
  return {
    email: TEST_EMAILS.DEFAULT_USER,
    iat: 1640995200,
    exp: 1641081600,
  };
};

export const companyJwtPayloadMock = () => {
  return {
    email: TEST_EMAILS.COMPANY,
    iat: 1640995200,
    exp: 1641081600,
  };
};

export const invalidJwtPayloadMock = () => {
  return {
    email: TEST_EMAILS.INVALID,
    iat: 1640995200,
    exp: 1641081600,
  };
};
