import { CreateUserDto } from '../../../src/modules/user/dtos/create-user.dto';
import { UserRole } from '../../../src/shared/utils/userRole/userRole';

export const createUserMock = (): CreateUserDto => {
  return {
    name: 'Non-Admin for tests',
    email: 'user@teste.com',
    password: 'teste@12A',
    cpf: '12345678910',
    policies: true,
    type: UserRole.USER,
  };
};
