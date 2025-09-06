import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { MailService } from '../../../../src/modules/mails/mail.service';
import { UserRepository } from '../../../../src/modules/user/repository/user.repository';
import { CompanyRepository } from '../../../../src/modules/company/repository/company.repository';
import { CreateUserService } from '../../../../src/modules/user/services';
import { createUserMock } from '../../../mocks/user/create-user.mock';
import { userMock } from '../../../mocks/user/user.mock';
import {
  TEST_PASSWORDS,
  TEST_EMAILS,
  TEST_IPS,
} from '../../../config/test-constants';
import {
  createUserRepositoryMock,
  createCompanyRepositoryMock,
} from '../../../shared/repository-mocks';

const mailServiceMock = () => ({
  sendUserCreationConfirmation: jest.fn(),
});

const mockRequest = (): Partial<Request> => ({
  ip: TEST_IPS.LOCALHOST,
});

describe('CreateUserService', () => {
  let service: CreateUserService;
  let userRepository: jest.Mocked<Partial<UserRepository>>;
  let companyRepository: jest.Mocked<Partial<CompanyRepository>>;
  let mailService: jest.Mocked<Partial<MailService>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        CreateUserService,
        {
          provide: UserRepository,
          useValue: createUserRepositoryMock(),
        },
        {
          provide: CompanyRepository,
          useValue: createCompanyRepositoryMock(),
        },
        {
          provide: MailService,
          useValue: mailServiceMock(),
        },
      ],
    }).compile();

    service = module.get(CreateUserService);
    userRepository = module.get(UserRepository);
    companyRepository = module.get(CompanyRepository);
    mailService = module.get(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should throw ConflictException when user email already exists', async () => {
      companyRepository.findOneByEmail!.mockResolvedValue(null);
      userRepository.findOneByEmail!.mockResolvedValue(userMock() as any);

      const createUserDto = createUserMock();
      const req = mockRequest() as Request;

      await expect(service.execute(createUserDto, req)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.execute(createUserDto, req)).rejects.toThrow(
        'E-mail já cadastrado',
      );

      expect(userRepository.findOneByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );
      expect(userRepository.createUser).not.toHaveBeenCalled();
      expect(mailService.sendUserCreationConfirmation).not.toHaveBeenCalled();
    });

    it('should throw ConflictException when company email already exists', async () => {
      companyRepository.findOneByEmail!.mockResolvedValue({
        id: '1',
        email: TEST_EMAILS.COMPANY,
      } as any);
      userRepository.findOneByEmail!.mockResolvedValue(null);

      const createUserDto = createUserMock();
      const req = mockRequest() as Request;

      await expect(service.execute(createUserDto, req)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.execute(createUserDto, req)).rejects.toThrow(
        'E-mail já cadastrado',
      );

      expect(companyRepository.findOneByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );
      expect(userRepository.createUser).not.toHaveBeenCalled();
    });

    it('should successfully create a user and send confirmation email', async () => {
      companyRepository.findOneByEmail!.mockResolvedValue(null);
      userRepository.findOneByEmail!.mockResolvedValue(null);

      const userWithSensitiveData = {
        ...userMock(),
        password: TEST_PASSWORDS.HASHED,
        recoverPasswordToken: TEST_PASSWORDS.TOKEN,
        ip: TEST_IPS.LOCALHOST,
      };

      userRepository.createUser!.mockResolvedValue(
        userWithSensitiveData as any,
      );
      mailService.sendUserCreationConfirmation!.mockResolvedValue(undefined);

      const createUserDto = createUserMock();
      const req = mockRequest() as Request;

      const result = await service.execute(createUserDto, req);

      expect(result).toEqual(userMock());
      expect(result).not.toHaveProperty('password');
      expect(result).not.toHaveProperty('recoverPasswordToken');
      expect(result).not.toHaveProperty('ip');

      expect(userRepository.findOneByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );
      expect(userRepository.createUser).toHaveBeenCalledWith({
        ...createUserDto,
        ip: TEST_IPS.LOCALHOST,
        password: expect.any(String),
      });
      expect(mailService.sendUserCreationConfirmation).toHaveBeenCalledWith(
        userMock(),
      );
    });
  });
});
