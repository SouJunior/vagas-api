import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthLoginService } from '../../../../src/modules/auth/services/auth-login.service';
import { UserRepository } from '../../../../src/modules/user/repository/user.repository';
import { CompanyRepository } from '../../../../src/modules/company/repository/company.repository';
import {
  userLoginMock,
  companyLoginMock,
  invalidUserLoginMock,
  userWithUnconfirmedEmailMock,
} from '../../../mocks/auth/user-login.mock';
import { userMock } from '../../../mocks/user/user.mock';
import { companyMock } from '../../../mocks/auth/company.mock';
import { TEST_PASSWORDS } from '../../../config/test-constants';

jest.mock('bcrypt');
const bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>;

describe('AuthLoginService - Refactored with Individual Mocks', () => {
  let service: AuthLoginService;
  let userRepository: jest.Mocked<Partial<UserRepository>>;
  let companyRepository: jest.Mocked<Partial<CompanyRepository>>;
  let jwtService: jest.Mocked<Partial<JwtService>>;

  const createUserRepositoryMock = (): jest.Mocked<
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

  const createCompanyRepositoryMock = (): jest.Mocked<
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

  const createJwtServiceMock = (): jest.Mocked<Partial<JwtService>> => ({
    sign: jest.fn(),
    signAsync: jest.fn(),
    verify: jest.fn(),
    verifyAsync: jest.fn(),
    decode: jest.fn(),
  });

  beforeEach(async () => {
    userRepository = createUserRepositoryMock();
    companyRepository = createCompanyRepositoryMock();
    jwtService = createJwtServiceMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthLoginService,
        {
          provide: UserRepository,
          useValue: userRepository,
        },
        {
          provide: CompanyRepository,
          useValue: companyRepository,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    service = module.get<AuthLoginService>(AuthLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('User Login', () => {
      it('should successfully login a user with valid credentials', async () => {
        const loginData = userLoginMock();
        const user = {
          ...userMock(),
          password: TEST_PASSWORDS.HASHED,
          mailConfirm: true,
        } as any;

        userRepository.findOneByEmail.mockResolvedValue(user);
        bcryptMock.compare.mockResolvedValue(true as never);
        jwtService.sign.mockReturnValue('fake-jwt-token');

        const result = await service.execute(loginData);

        expect(result.status).toBe(200);
        expect(result.data.token).toBe('fake-jwt-token');
        expect(result.data.info).toBeDefined();
        expect(result.data.info.password).toBeUndefined();
        expect(result.data.info.recoverPasswordToken).toBeUndefined();
        expect(userRepository.findOneByEmail).toHaveBeenCalledWith(
          loginData.email,
        );
        expect(bcryptMock.compare).toHaveBeenCalledWith(
          loginData.password,
          TEST_PASSWORDS.HASHED,
        );
      });

      it('should return error for user with unconfirmed email', async () => {
        const loginData = userWithUnconfirmedEmailMock();
        const user = {
          ...userMock(),
          password: TEST_PASSWORDS.HASHED,
          mailConfirm: false,
        } as any;

        userRepository.findOneByEmail.mockResolvedValue(user);
        bcryptMock.compare.mockResolvedValue(true as never);

        const result = await service.execute(loginData);

        expect(result.status).toBe(400);
        expect(result.data.message).toBe('Email not validated');
        expect(userRepository.findOneByEmail).toHaveBeenCalledWith(
          loginData.email,
        );
        expect(jwtService.sign).not.toHaveBeenCalled();
      });

      it('should return error for invalid user credentials', async () => {
        const loginData = invalidUserLoginMock();

        userRepository.findOneByEmail.mockResolvedValue(null);

        const result = await service.execute(loginData);

        expect(result.status).toBe(400);
        expect(result.data.message).toBe('Email not validated');
        expect(userRepository.findOneByEmail).toHaveBeenCalledWith(
          loginData.email,
        );
        expect(bcryptMock.compare).not.toHaveBeenCalled();
        expect(jwtService.sign).not.toHaveBeenCalled();
      });
    });

    describe('Company Login', () => {
      it('should successfully login a company with valid credentials', async () => {
        const loginData = companyLoginMock();
        const company = {
          ...companyMock(),
          password: TEST_PASSWORDS.HASHED,
          mailConfirm: true,
        } as any;

        userRepository.findOneByEmail.mockResolvedValue(null);
        companyRepository.findOneByEmail.mockResolvedValue(company);
        bcryptMock.compare.mockResolvedValue(true as never);
        jwtService.sign.mockReturnValue('fake-company-jwt-token');

        const result = await service.execute(loginData);

        expect(result.status).toBe(200);
        expect(result.data.token).toBe('fake-company-jwt-token');
        expect(result.data.info).toBeDefined();
        expect(result.data.info.password).toBeUndefined();
        expect(companyRepository.findOneByEmail).toHaveBeenCalledWith(
          loginData.email,
        );
        expect(bcryptMock.compare).toHaveBeenCalledWith(
          loginData.password,
          TEST_PASSWORDS.HASHED,
        );
      });
    });
  });
});
