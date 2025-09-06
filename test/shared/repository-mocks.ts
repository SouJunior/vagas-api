import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../src/modules/user/repository/user.repository';
import { CompanyRepository } from '../../src/modules/company/repository/company.repository';

export const createUserRepositoryMock = (): jest.Mocked<
  Partial<UserRepository>
> => ({
  findOneByEmail: jest.fn(),
  findOneById: jest.fn(),
  createUser: jest.fn(),
  getAllUsers: jest.fn(),
  updateUser: jest.fn(),
  updatePassword: jest.fn(),
  updateRecoveryPassword: jest.fn(),
  activateUser: jest.fn(),
  deleteUserById: jest.fn(),
  searchUserByName: jest.fn(),
  updateMyPassword: jest.fn(),
  findByToken: jest.fn(),
});

export const createCompanyRepositoryMock = (): jest.Mocked<
  Partial<CompanyRepository>
> => ({
  findOneByEmail: jest.fn(),
  findOneById: jest.fn(),
  createCompany: jest.fn(),
  findAllCompany: jest.fn(),
  updateCompanyById: jest.fn(),
  updateMyPassword: jest.fn(),
  updateRecoveryPassword: jest.fn(),
  activateCompany: jest.fn(),
  deleteCompanyById: jest.fn(),
  findCompanyById: jest.fn(),
  findByToken: jest.fn(),
  findOneByCnpj: jest.fn(),
  updateCompany: jest.fn(),
  updatePassword: jest.fn(),
});

export const createJwtServiceMock = (): jest.Mocked<Partial<JwtService>> => ({
  sign: jest.fn(),
  signAsync: jest.fn(),
  verify: jest.fn(),
  verifyAsync: jest.fn(),
  decode: jest.fn(),
});
