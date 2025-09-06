import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import * as request from 'supertest';
import { AuthController } from '../../../src/modules/auth/auth.controller';
import { AuthLoginService } from '../../../src/modules/auth/services/auth-login.service';
import {
  userLoginMock,
  companyLoginMock,
  invalidUserLoginMock,
} from '../../mocks/auth/user-login.mock';
import { userMock } from '../../mocks/user/user.mock';
import { publicCompanyMock } from '../../mocks/auth/company.mock';
import { TEST_PASSWORDS, TEST_EMAILS } from '../../config/test-constants';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authLoginService: any;

  beforeEach(async () => {
    const mockAuthLoginService = {
      execute: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthLoginService,
          useValue: mockAuthLoginService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    authLoginService = moduleFixture.get<AuthLoginService>(AuthLoginService);

    await app.init();

    jest.clearAllMocks();
  });

  afterEach(async () => {
    jest.restoreAllMocks();
    if (app) {
      await app.close();
    }
  });

  describe('/auth/login (POST)', () => {
    it('should successfully login a user', async () => {
      const loginData = userLoginMock();
      const mockResponse = {
        token: 'fake-jwt-token',
        info: userMock(),
      };

      authLoginService.execute.mockResolvedValue(mockResponse);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('info');
      expect(authLoginService.execute).toHaveBeenCalledWith(loginData);
    });

    it('should successfully login a company', async () => {
      const loginData = companyLoginMock();
      const mockResponse = {
        token: 'fake-jwt-token',
        info: publicCompanyMock(),
      };

      authLoginService.execute.mockResolvedValue(mockResponse);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('info');
      expect(authLoginService.execute).toHaveBeenCalledWith(loginData);
    });

    it('should return 401 for invalid credentials', async () => {
      const loginData = invalidUserLoginMock();
      const unauthorizedException = new UnauthorizedException(
        'E-mail ou Senha não conferem',
      );

      authLoginService.execute.mockRejectedValue(unauthorizedException);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty(
        'message',
        'E-mail ou Senha não conferem',
      );
      expect(authLoginService.execute).toHaveBeenCalledWith(loginData);
    });

    it('should return 401 for unconfirmed email', async () => {
      const loginData = userLoginMock();
      const unauthorizedException = new UnauthorizedException(
        'E-mail ou Senha não conferem',
      );

      authLoginService.execute.mockRejectedValue(unauthorizedException);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty(
        'message',
        'E-mail ou Senha não conferem',
      );
      expect(authLoginService.execute).toHaveBeenCalledWith(loginData);
    });

    it('should return 400 for invalid login data format', async () => {
      const invalidLoginData = {
        email: 'invalid-email',
        password: TEST_PASSWORDS.SIMPLE,
        type: 'INVALID_TYPE',
      };

      const executeSpy = jest.spyOn(authLoginService, 'execute');

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(invalidLoginData)
        .expect(400);

      expect(executeSpy).toHaveBeenCalledTimes(0);

      expect(response.body).toHaveProperty('message');
      expect(
        Array.isArray(response.body.message) ||
          typeof response.body.message === 'string',
      ).toBe(true);

      const errorMessage = Array.isArray(response.body.message)
        ? response.body.message.join(' ')
        : response.body.message;
      expect(errorMessage.toLowerCase()).toMatch(/email|type|valid/);

      executeSpy.mockRestore();
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteLoginData = {
        email: TEST_EMAILS.DEFAULT_USER,
      };

      const executeSpy = jest.spyOn(authLoginService, 'execute');

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(incompleteLoginData)
        .expect(400);

      expect(executeSpy).toHaveBeenCalledTimes(0);

      expect(response.body).toHaveProperty('message');
      expect(
        Array.isArray(response.body.message) ||
          typeof response.body.message === 'string',
      ).toBe(true);

      const errorMessage = Array.isArray(response.body.message)
        ? response.body.message.join(' ')
        : response.body.message;
      expect(errorMessage.toLowerCase()).toMatch(/password|required/);

      executeSpy.mockRestore();
    });
  });
});
