import { UsersEntity } from '../../../src/database/entities/users.entity';

export const userMailMock = (): UsersEntity => ({
  id: '729c7919-583c-40a5-b0ca-137e282345d4',
  name: 'Test User',
  email: 'user@example.com',
  password: 'hashedPassword123',
  recoverPasswordToken: 'recover-token-123',
  mailConfirm: false,
  type: 'USER',
  policies: true,
  created_at: new Date('2023-01-01T00:00:00.000Z'),
  updated_at: new Date('2023-01-01T00:00:00.000Z'),
  ip: '127.0.0.1',
  mainPhone: '11999999999',
  phone: '1133333333',
  city: 'São Paulo',
  state: 'SP',
  profile: null,
  profileKey: null,
  personalData: null,
  curriculums: [],
  applications: [],
  candidacies: [],
});

export const userMailWithoutTokenMock = (): UsersEntity => ({
  ...userMailMock(),
  recoverPasswordToken: null,
  mailConfirm: true,
});
