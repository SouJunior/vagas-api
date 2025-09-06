import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '../../../../src/modules/mails/mail.service';
import { UserRepository } from '../../../../src/modules/user/repository/user.repository';
import { RecoveryPasswordByEmail } from '../../../../src/modules/user/services/recovery-password-by-email.service';
import {
  userMock,
  userUpdateRecoveryMock,
} from '../../../mocks/user/user.mock';
import { createUserRepositoryMock } from '../../../shared/repository-mocks';

const createMailServiceMock = (): jest.Mocked<Partial<MailService>> => ({
  sendUserConfirmation: jest.fn().mockResolvedValue(''),
});

describe('RecoveryPasswordByEmail', () => {
  let service: RecoveryPasswordByEmail;
  let userRepository: jest.Mocked<Partial<UserRepository>>;
  let mailService: jest.Mocked<Partial<MailService>>;

  beforeEach(async () => {
    userRepository = createUserRepositoryMock();
    mailService = createMailServiceMock();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecoveryPasswordByEmail],
      providers: [
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

    service = module.get(RecoveryPasswordByEmail);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should be able to return an message when email no exists', async () => {
      userRepository.findOneByEmail = jest.fn().mockResolvedValue('');
      const findOneByEmailSpy = jest.spyOn(userRepository, 'findOneByEmail');
      const updateRecoveryPasswordSpy = jest.spyOn(
        userRepository,
        'updateRecoveryPassword',
      );
      const { status, data } = await service.execute('teste@teste.com');
      const result = {
        message:
          'Caso esse e-mail esteja cadastrado no sistema, será encaminhado para ele uma mensagem de orientação sobre os próximos passos para a redefinição da senha.',
      };
      expect(status).toEqual(200);
      expect(data).toEqual(result);
      expect(findOneByEmailSpy).toHaveBeenCalled();
      expect(findOneByEmailSpy).toBeCalledTimes(1);
      expect(updateRecoveryPasswordSpy).not.toHaveBeenCalled();
    });

    it('should be able to update a recovery password and send email', async () => {
      userRepository.findOneByEmail = jest.fn().mockResolvedValue(userMock());
      mailService.sendUserConfirmation = jest.fn().mockResolvedValue('');
      userRepository.updateRecoveryPassword = jest
        .fn()
        .mockResolvedValue(userUpdateRecoveryMock());
      const findOneByEmailSpy = jest.spyOn(userRepository, 'findOneByEmail');
      const updateRecoveryPasswordSpy = jest.spyOn(
        userRepository,
        'updateRecoveryPassword',
      );
      const { status, data } = await service.execute('teste@teste.com');
      const result = {
        message:
          'Caso esse e-mail esteja cadastrado no sistema, será encaminhado para ele uma mensagem de orientação sobre os próximos passos para a redefinição da senha.',
      };
      expect(status).toEqual(200);
      expect(data).toEqual(result);
      expect(findOneByEmailSpy).toHaveBeenCalled();
      expect(findOneByEmailSpy).toBeCalledTimes(1);
      expect(updateRecoveryPasswordSpy).toHaveBeenCalled();
      expect(updateRecoveryPasswordSpy).toBeCalledTimes(1);
    });
  });
});
