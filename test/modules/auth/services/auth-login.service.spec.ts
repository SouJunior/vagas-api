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
import {
  companyMock,
  companyWithUnconfirmedEmailMock,
} from '../../../mocks/auth/company.mock';
import {
  TEST_PASSWORDS,
  TEST_EMAILS,
  TEST_IPS,
} from '../../../config/test-constants';

jest.mock('bcrypt');
const bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>;

describe('AuthLoginService', () => {
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
        };

        userRepository.findOneByEmail.mockResolvedValue(user as any);
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
        expect(jwtService.sign).toHaveBeenCalledWith({
          email: loginData.email,
        });
      });

      it('should return error when user email is not confirmed', async () => {
        const loginData = userWithUnconfirmedEmailMock();
        const user = {
          ...userMock(),
          password: TEST_PASSWORDS.HASHED,
          mailConfirm: false,
        };

        userRepository.findOneByEmail.mockResolvedValue(user as any);

        const result = await service.execute(loginData);

        expect(result.status).toBe(400);
        expect(result.data.message).toBe('Email not validated');
        expect(userRepository.findOneByEmail).toHaveBeenCalledWith(
          loginData.email,
        );
        expect(bcryptMock.compare).not.toHaveBeenCalled();
        expect(jwtService.sign).not.toHaveBeenCalled();
      });

      it('should return error when user does not exist', async () => {
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

      it('should return error when password is invalid', async () => {
        const loginData = userLoginMock();
        const user = {
          ...userMock(),
          password: TEST_PASSWORDS.HASHED,
          mailConfirm: true,
        };

        userRepository.findOneByEmail.mockResolvedValue(user as any);
        bcryptMock.compare.mockResolvedValue(false as never);

        const result = await service.execute(loginData);

        expect(result.status).toBe(400);
        expect(result.data.message).toBe('E-mail ou Senha não conferem');
        expect(userRepository.findOneByEmail).toHaveBeenCalledWith(
          loginData.email,
        );
        expect(bcryptMock.compare).toHaveBeenCalledWith(
          loginData.password,
          user.password,
        );
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
        };

        companyRepository.findOneByEmail.mockResolvedValue(company as any);
        bcryptMock.compare.mockResolvedValue(true as never);
        jwtService.sign.mockReturnValue('fake-jwt-token');

        const result = await service.execute(loginData);

        expect(result.status).toBe(200);
        expect(result.data.token).toBe('fake-jwt-token');
        expect(result.data.info).toBeDefined();
        expect(result.data.info.password).toBeUndefined();
        expect(result.data.info.recoverPasswordToken).toBeUndefined();
        expect(companyRepository.findOneByEmail).toHaveBeenCalledWith(
          loginData.email,
        );
        expect(bcryptMock.compare).toHaveBeenCalledWith(
          loginData.password,
          TEST_PASSWORDS.HASHED,
        );
        expect(jwtService.sign).toHaveBeenCalledWith({
          email: loginData.email,
        });
      });

      it('should return error when company email is not confirmed', async () => {
        const loginData = {
          ...companyLoginMock(),
          email: TEST_EMAILS.UNCONFIRMED_COMPANY,
        };
        const company = companyWithUnconfirmedEmailMock();

        companyRepository.findOneByEmail.mockResolvedValue(company as any);

        const result = await service.execute(loginData);

        expect(result.status).toBe(400);
        expect(result.data.message).toBe('Email not validated');
        expect(companyRepository.findOneByEmail).toHaveBeenCalledWith(
          loginData.email,
        );
        expect(bcryptMock.compare).not.toHaveBeenCalled();
        expect(jwtService.sign).not.toHaveBeenCalled();
      });

      it('should return error when company does not exist', async () => {
        const loginData = companyLoginMock();

        companyRepository.findOneByEmail.mockResolvedValue(null);

        const result = await service.execute(loginData);

        expect(result.status).toBe(400);
        expect(result.data.message).toBe('Email not validated');
        expect(companyRepository.findOneByEmail).toHaveBeenCalledWith(
          loginData.email,
        );
        expect(bcryptMock.compare).not.toHaveBeenCalled();
        expect(jwtService.sign).not.toHaveBeenCalled();
      });

      it('should return error when company password is invalid', async () => {
        const loginData = companyLoginMock();
        const company = {
          ...companyMock(),
          password: TEST_PASSWORDS.HASHED,
          mailConfirm: true,
        };

        companyRepository.findOneByEmail.mockResolvedValue(company as any);
        bcryptMock.compare.mockResolvedValue(false as never);

        const result = await service.execute(loginData);

        expect(result.status).toBe(400);
        expect(result.data.message).toBe('E-mail ou Senha não conferem');
        expect(companyRepository.findOneByEmail).toHaveBeenCalledWith(
          loginData.email,
        );
        expect(bcryptMock.compare).toHaveBeenCalledWith(
          loginData.password,
          company.password,
        );
        expect(jwtService.sign).not.toHaveBeenCalled();
      });
    });

    describe('Data Sanitization', () => {
      it('should remove sensitive fields from user response', async () => {
        const loginData = userLoginMock();
        const user = {
          ...userMock(),
          password: TEST_PASSWORDS.HASHED,
          recoverPasswordToken: TEST_PASSWORDS.TOKEN,
          mailconfirm: true,
          ip: TEST_IPS.DOCUMENTATION_IP,
          mailConfirm: true,
        };

        userRepository.findOneByEmail.mockResolvedValue(user as any);
        bcryptMock.compare.mockResolvedValue(true as never);
        jwtService.sign.mockReturnValue('fake-jwt-token');

        const result = await service.execute(loginData);

        expect(result.status).toBe(200);
        expect(result.data.info.password).toBeUndefined();
        expect(result.data.info.recoverPasswordToken).toBeUndefined();
        expect(result.data.info.mailconfirm).toBeUndefined();
        expect(result.data.info.ip).toBeUndefined();
      });

      it('should remove sensitive fields from company response', async () => {
        const loginData = companyLoginMock();
        const company = {
          ...companyMock(),
          password: TEST_PASSWORDS.HASHED,
          recoverPasswordToken: TEST_PASSWORDS.TOKEN,
          mailconfirm: true,
          ip: TEST_IPS.DOCUMENTATION_IP,
          mailConfirm: true,
        };

        companyRepository.findOneByEmail.mockResolvedValue(company as any);
        bcryptMock.compare.mockResolvedValue(true as never);
        jwtService.sign.mockReturnValue('fake-jwt-token');

        const result = await service.execute(loginData);

        expect(result.status).toBe(200);
        expect(result.data.info.password).toBeUndefined();
        expect(result.data.info.recoverPasswordToken).toBeUndefined();
        expect(result.data.info.mailconfirm).toBeUndefined();
        expect(result.data.info.ip).toBeUndefined();
      });
    });
  });
});
