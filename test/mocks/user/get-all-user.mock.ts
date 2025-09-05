import { TEST_EMAILS, TEST_USER_DATA } from '../../config/test-constants';

export const getAllUserMock = () => {
  return {
    data: [
      {
        id: '729c7919-583c-40a5-b0ca-137e282345d4',
        name: 'Non-Admin for tests2.0',
        email: TEST_EMAILS.DEFAULT_USER,
        cpf: TEST_USER_DATA.CPF,
        created_at: '2023-02-21T00:25:07.000Z',
      },
      {
        id: '829c7919-583c-40a5-b0ca-137e282345d5',
        name: 'Non-Admin for tests2.0',
        email: TEST_EMAILS.DEFAULT_USER,
        cpf: TEST_USER_DATA.CPF,
        created_at: '2023-02-21T00:25:07.000Z',
      },
      {
        id: '929c7919-583c-40a5-b0ca-137e282345d6',
        name: 'Non-Admin for tests2.0',
        email: TEST_EMAILS.DEFAULT_USER,
        cpf: TEST_USER_DATA.CPF,
        created_at: '2023-02-21T00:25:07.000Z',
      },
      {
        id: 'a29c7919-583c-40a5-b0ca-137e282345d7',
        name: 'Non-Admin for tests2.0',
        email: TEST_EMAILS.DEFAULT_USER,
        cpf: TEST_USER_DATA.CPF,
        created_at: '2023-02-21T00:25:07.000Z',
      },
    ],
    meta: {
      orderByColumn: 'name',
      page: '1',
      take: '5',
      itemCount: 1,
      pageCount: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  };
};
