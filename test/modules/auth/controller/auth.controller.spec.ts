import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthController } from '../../../../src/modules/auth/auth.controller';
import { AuthLoginService } from '../../../../src/modules/auth/services/auth-login.service';
import {
  userLoginMock,
  companyLoginMock,
  invalidUserLoginMock,
} from '../../../mocks/auth/user-login.mock';
import { userMock } from '../../../mocks/user/user.mock';
import { companyEntityMock } from '../../../mocks/auth/company.mock';

const authLoginServiceMock = () => ({
  execute: jest.fn(),
});

describe('AuthController', () => {
  let controller: AuthController;
  let authLoginService: jest.Mocked<Partial<AuthLoginService>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthLoginService,
          useValue: authLoginServiceMock(),
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authLoginService = module.get(AuthLoginService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should successfully login user and return token and info', async () => {
      const loginData = userLoginMock();
      const mockServiceResponse = {
        token: 'fake-jwt-token',
        info: userMock(),
      };

      authLoginService.execute!.mockResolvedValue(mockServiceResponse);

      const result = await controller.login(loginData);

      expect(authLoginService.execute).toHaveBeenCalledWith(loginData);
      expect(result).toEqual(mockServiceResponse);
      expect(result.token).toBe('fake-jwt-token');
      expect(result.info).toEqual(userMock());
    });

    it('should successfully login company and return token and info', async () => {
      const loginData = companyLoginMock();
      const mockServiceResponse = {
        token: 'fake-jwt-token',
        info: companyEntityMock(),
      };

      authLoginService.execute!.mockResolvedValue(mockServiceResponse);

      const result = await controller.login(loginData);

      expect(authLoginService.execute).toHaveBeenCalledWith(loginData);
      expect(result).toEqual(mockServiceResponse);
      expect(result.token).toBe('fake-jwt-token');
      expect(result.info).toEqual(companyEntityMock());
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const loginData = invalidUserLoginMock();
      const error = new UnauthorizedException('E-mail ou Senha não conferem');

      authLoginService.execute!.mockRejectedValue(error);

      await expect(controller.login(loginData)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(controller.login(loginData)).rejects.toThrow(
        'E-mail ou Senha não conferem',
      );

      expect(authLoginService.execute).toHaveBeenCalledWith(loginData);
    });

    it('should throw UnauthorizedException for unconfirmed email', async () => {
      const loginData = userLoginMock();
      const error = new UnauthorizedException('E-mail ou Senha não conferem');

      authLoginService.execute!.mockRejectedValue(error);

      await expect(controller.login(loginData)).rejects.toThrow(
        UnauthorizedException,
      );
      await expect(controller.login(loginData)).rejects.toThrow(
        'E-mail ou Senha não conferem',
      );

      expect(authLoginService.execute).toHaveBeenCalledWith(loginData);
    });

    it('should handle service exceptions properly', async () => {
      const loginData = userLoginMock();
      const error = new Error('Service error');

      authLoginService.execute!.mockRejectedValue(error);

      await expect(controller.login(loginData)).rejects.toThrow(
        'Service error',
      );

      expect(authLoginService.execute).toHaveBeenCalledWith(loginData);
    });
  });

  describe('userLogged', () => {
    it('should return logged user information', async () => {
      const user = userMock() as any;

      const result = await controller.userLogged(user);

      expect(result).toEqual(user);
    });

    it('should return logged company information', async () => {
      const company = companyEntityMock() as any;

      const result = await controller.userLogged(company);

      expect(result).toEqual(company);
    });

    it('should handle undefined user', async () => {
      const result = await controller.userLogged(undefined as any);

      expect(result).toBeUndefined();
    });

    it('should return user with all fields intact', async () => {
      const userWithExtraFields = {
        ...userMock(),
        additionalField: 'extra-data',
        settings: { theme: 'dark' },
      } as any;

      const result = await controller.userLogged(userWithExtraFields);

      expect(result).toEqual(userWithExtraFields);
      expect((result as any).additionalField).toBe('extra-data');
      expect((result as any).settings).toEqual({ theme: 'dark' });
    });
  });
});
