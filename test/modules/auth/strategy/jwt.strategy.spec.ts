import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../../../../src/modules/auth/jwt/jwt.strategy';
import { UserRepository } from '../../../../src/modules/user/repository/user.repository';
import { CompanyRepository } from '../../../../src/modules/company/repository/company.repository';
import { jwtPayloadMock } from '../../../mocks/auth/jwt-payload.mock';
import {
  TEST_PASSWORDS,
  TEST_USER_DATA,
  TEST_EMAILS,
} from '../../../config/test-constants';

const createUserRepositoryMock = (): jest.Mocked<Partial<UserRepository>> => ({
  findOneByEmail: jest.fn(),
});

const createCompanyRepositoryMock = (): jest.Mocked<
  Partial<CompanyRepository>
> => ({
  findOneByEmail: jest.fn(),
});

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let userRepository: jest.Mocked<Partial<UserRepository>>;
  let companyRepository: jest.Mocked<Partial<CompanyRepository>>;

  beforeEach(async () => {
    process.env.JWT_SECRET = 'test-secret-key';

    userRepository = createUserRepositoryMock();
    companyRepository = createCompanyRepositoryMock();

    const configServiceMock = {
      getOrThrow: jest.fn().mockReturnValue('test-secret-key'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: UserRepository,
          useValue: userRepository,
        },
        {
          provide: CompanyRepository,
          useValue: companyRepository,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    it('should successfully validate and return user principal matching mapper output', async () => {
      const payload = jwtPayloadMock();
      const user = {
        id: '729c7919-583c-40a5-b0ca-137e282345d4',
        name: 'Non-Admin for tests',
        email: TEST_EMAILS.DEFAULT_USER,
        password: TEST_PASSWORDS.HASHED,
        type: 'USER',
        phone: TEST_USER_DATA.PHONE,
        policies: true,
        ip: null,
        mainPhone: null,
        city: null,
        state: null,
        street: null,
        complement: null,
        cep: '12345678',
        birthDate: new Date('1990-01-01'),
        bio: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        mailConfirm: true,
        recoverPasswordToken: null,
      };

      userRepository.findOneByEmail!.mockResolvedValue(user as any);
      companyRepository.findOneByEmail!.mockResolvedValue(null);

      const result = await strategy.validate(payload);

      const expectedUserPrincipal = {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        phone: user.phone,
        userType: 'user',
      };

      expect(result).toEqual(expectedUserPrincipal);
      expect(userRepository.findOneByEmail).toHaveBeenCalledWith(payload.email);
      expect(companyRepository.findOneByEmail).not.toHaveBeenCalled();
    });

    it('should successfully validate and return company principal matching mapper output', async () => {
      const payload = jwtPayloadMock();
      const company = {
        id: '829c7919-583c-40a5-b0ca-137e282345d5',
        companyName: 'Test Company',
        email: payload.email,
        cnpj: '12345678901234',
        created_at: new Date(),
        mailConfirm: true,
        password: TEST_PASSWORDS.HASHED,
        type: 'COMPANY',
      };

      userRepository.findOneByEmail!.mockResolvedValue(null);
      companyRepository.findOneByEmail!.mockResolvedValue(company as any);

      const result = await strategy.validate(payload);

      const expectedCompanyPrincipal = {
        id: company.id,
        companyName: company.companyName,
        email: company.email,
        cnpj: company.cnpj,
        userType: 'company',
      };

      expect(result).toEqual(expectedCompanyPrincipal);
      expect(userRepository.findOneByEmail).toHaveBeenCalledWith(payload.email);
      expect(companyRepository.findOneByEmail).toHaveBeenCalledWith(
        payload.email,
      );
    });

    it('should throw UnauthorizedException when neither user nor company is found', async () => {
      const payload = jwtPayloadMock();

      userRepository.findOneByEmail!.mockResolvedValue(null);
      companyRepository.findOneByEmail!.mockResolvedValue(null);

      await expect(strategy.validate(payload)).rejects.toThrow(
        'User not found or not authorized!',
      );

      expect(userRepository.findOneByEmail).toHaveBeenCalledWith(payload.email);
      expect(companyRepository.findOneByEmail).toHaveBeenCalledWith(
        payload.email,
      );
    });

    it('should return user principal with exact fields from mapper, no additional fields', async () => {
      const payload = jwtPayloadMock();
      const userWithExtraFields = {
        id: '729c7919-583c-40a5-b0ca-137e282345d4',
        name: 'Non-Admin for tests',
        email: TEST_EMAILS.DEFAULT_USER,
        password: TEST_PASSWORDS.SENSITIVE,
        type: 'USER',
        phone: TEST_USER_DATA.PHONE,
        policies: true,
        ip: null,
        mainPhone: null,
        city: null,
        state: null,
        street: null,
        complement: null,
        cep: '12345678',
        birthDate: new Date('1990-01-01'),
        bio: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        mailConfirm: true,
        recoverPasswordToken: 'sensitive-token',
        extraSensitiveField: 'should-not-appear',
        anotherField: 'also-sensitive',
      };

      userRepository.findOneByEmail!.mockResolvedValue(
        userWithExtraFields as any,
      );
      companyRepository.findOneByEmail!.mockResolvedValue(null);

      const userResult = await strategy.validate(payload);

      const expectedUserFields = [
        'id',
        'name',
        'email',
        'type',
        'phone',
        'userType',
      ];
      const actualUserFields = Object.keys(userResult);

      expect(actualUserFields).toEqual(expectedUserFields);
      expect(userResult).not.toHaveProperty('password');
      expect(userResult).not.toHaveProperty('recoverPasswordToken');
      expect(userResult).not.toHaveProperty('extraSensitiveField');
      expect(userResult).not.toHaveProperty('anotherField');
      expect(userResult).not.toHaveProperty('ip');
      expect(userResult).not.toHaveProperty('policies');

      expect(userRepository.findOneByEmail).toHaveBeenCalledWith(payload.email);
      expect(companyRepository.findOneByEmail).not.toHaveBeenCalled();
    });

    it('should return company principal with exact fields from mapper, no additional fields', async () => {
      const payload = jwtPayloadMock();
      const companyWithExtraFields = {
        id: '829c7919-583c-40a5-b0ca-137e282345d5',
        companyName: 'Test Company',
        email: payload.email,
        cnpj: '12345678901234',
        created_at: new Date(),
        mailConfirm: true,
        password: TEST_PASSWORDS.SENSITIVE,
        type: 'COMPANY',
        extraSensitiveField: 'should-not-appear',
        recoverPasswordToken: 'sensitive-token',
        internalNotes: 'confidential',
      };

      userRepository.findOneByEmail!.mockResolvedValue(null);
      companyRepository.findOneByEmail!.mockResolvedValue(
        companyWithExtraFields as any,
      );

      const companyResult = await strategy.validate(payload);

      const expectedCompanyFields = [
        'id',
        'companyName',
        'email',
        'cnpj',
        'userType',
      ];
      const actualCompanyFields = Object.keys(companyResult);

      expect(actualCompanyFields).toEqual(expectedCompanyFields);
      expect(companyResult).not.toHaveProperty('password');
      expect(companyResult).not.toHaveProperty('recoverPasswordToken');
      expect(companyResult).not.toHaveProperty('extraSensitiveField');
      expect(companyResult).not.toHaveProperty('internalNotes');
      expect(companyResult).not.toHaveProperty('mailConfirm');

      expect(userRepository.findOneByEmail).toHaveBeenCalledWith(payload.email);
      expect(companyRepository.findOneByEmail).toHaveBeenCalledWith(
        payload.email,
      );
    });

    it('should throw UnauthorizedException for invalid payload without email', async () => {
      const invalidPayload = {};

      await expect(strategy.validate(invalidPayload as any)).rejects.toThrow(
        'Invalid payload or email',
      );

      expect(userRepository.findOneByEmail).not.toHaveBeenCalled();
      expect(companyRepository.findOneByEmail).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException for undefined payload', async () => {
      await expect(strategy.validate(undefined as any)).rejects.toThrow(
        'Invalid payload or email',
      );

      expect(userRepository.findOneByEmail).not.toHaveBeenCalled();
      expect(companyRepository.findOneByEmail).not.toHaveBeenCalled();
    });
  });
});
