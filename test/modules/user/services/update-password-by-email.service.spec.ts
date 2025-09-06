import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../../src/modules/user/repository/user.repository';
import { MailService } from '../../../../src/modules/mails/mail.service';
import { UpdatePasswordByEmailService } from '../../../../src/modules/user/services/update-password-by-email.service';
import { userMock } from '../../../mocks/user/user.mock';
import { TEST_PASSWORDS, TEST_IDS } from '../../../config/test-constants';

const createUserRepositoryMock = (): jest.Mocked<Partial<UserRepository>> => ({
  findByToken: jest.fn(),
  updatePassword: jest.fn(),
});

const createMailServiceMock = (): jest.Mocked<Partial<MailService>> => ({
  sendUserConfirmation: jest.fn(),
});

describe('UpdatePasswordByEmailService', () => {
  let service: UpdatePasswordByEmailService;
  let userRepository: jest.Mocked<Partial<UserRepository>>;
  let mailService: jest.Mocked<Partial<MailService>>;

  beforeEach(async () => {
    userRepository = createUserRepositoryMock();
    mailService = createMailServiceMock();

    const testingModule: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        UpdatePasswordByEmailService,
        {
          provide: UserRepository,
          useValue: userRepository,
        },
        {
          provide: MailService,
          useValue: mailService,
        },
      ],
    }).compile();

    service = testingModule.get(UpdatePasswordByEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should throw NotFoundException when user does not exist', async () => {
      userRepository.findByToken = jest.fn().mockResolvedValue('');

      await expect(
        service.execute({
          recoverPasswordToken: TEST_PASSWORDS.TOKEN,
          password: TEST_PASSWORDS.SIMPLE,
          confirmPassword: TEST_PASSWORDS.SIMPLE,
        }),
      ).rejects.toThrow(new NotFoundException('Usuário não encontrado!'));

      expect(userRepository.findByToken).toHaveBeenCalledWith(
        TEST_PASSWORDS.TOKEN,
      );
      expect(userRepository.updatePassword).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when passwords do not match', async () => {
      userRepository.findByToken = jest.fn().mockResolvedValue(userMock());

      await expect(
        service.execute({
          recoverPasswordToken: TEST_PASSWORDS.TOKEN,
          password: TEST_PASSWORDS.SIMPLE,
          confirmPassword: TEST_PASSWORDS.DIFFERENT,
        }),
      ).rejects.toThrow(new BadRequestException('As senhas não conferem!'));

      expect(userRepository.findByToken).toHaveBeenCalledWith(
        TEST_PASSWORDS.TOKEN,
      );
      expect(userRepository.updatePassword).not.toHaveBeenCalled();
    });

    it('should successfully update user password and send confirmation', async () => {
      const updatedUser = userMock();
      userRepository.findByToken = jest.fn().mockResolvedValue(userMock());
      userRepository.updatePassword = jest.fn().mockResolvedValue(updatedUser);

      const { status, data } = await service.execute({
        recoverPasswordToken: TEST_PASSWORDS.TOKEN,
        password: TEST_PASSWORDS.SIMPLE,
        confirmPassword: TEST_PASSWORDS.SIMPLE,
      });

      expect(status).toEqual(200);
      expect(data).toEqual({ message: 'Senha redefinida com sucesso!' });

      expect(userRepository.findByToken).toHaveBeenCalledWith(
        TEST_PASSWORDS.TOKEN,
      );
      expect(userRepository.updatePassword).toHaveBeenCalledWith(
        TEST_IDS.USER_ID,
        expect.any(String),
      );
    });
  });
});
