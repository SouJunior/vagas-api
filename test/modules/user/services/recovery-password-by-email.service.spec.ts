import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '../../../../src/modules/mails/mail.service';
import { UserRepository } from '../../../../src/modules/user/repository/user.repository';
import { RecoveryPasswordByEmail } from '../../../../src/modules/user/services/recovery-password-by-email.service';
import {
  userMock,
  userUpdateRecoveryMock,
} from '../../../mocks/user/user.mock';

class UserRepositoryMock {
  findOneByEmail = jest.fn();
  updateRecoveryPassword = jest.fn();
}

class MailServiceMock {
  sendUserConfirmation = jest.fn().mockResolvedValue('');
}

describe('RecoveryPasswordByEmail', () => {
  let service: RecoveryPasswordByEmail;
  let userRepository: UserRepositoryMock;
  let mailService: MailServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecoveryPasswordByEmail],
      providers: [
        {
          provide: UserRepository,
          useClass: UserRepositoryMock,
        },
        {
          provide: MailService,
          useClass: MailServiceMock,
        },
      ],
    }).compile();

    service = module.get(RecoveryPasswordByEmail);
    userRepository = module.get(UserRepository);
    mailService = module.get(MailService);
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
        message: 'If email exists a email to recovery password was send',
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
        message: 'If email exists a email to recovery password was send',
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
