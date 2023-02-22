import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../../src/modules/user/repository/user.repository';
import { UpdatePasswordByEmailService } from '../../../../src/modules/user/services/update-password-by-email.service';
import { userMock } from '../../../mocks/user/user.mock';

class UserRepositoryMock {
  findByToken = jest.fn();
  updatePassword = jest.fn();
}

describe('UpdatePasswordByEmailService', () => {
  let service: UpdatePasswordByEmailService;
  let userRepository: UserRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdatePasswordByEmailService],
      providers: [
        {
          provide: UserRepository,
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(UpdatePasswordByEmailService);
    userRepository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should be able to return an error when user not exists', async () => {
      userRepository.findByToken = jest.fn().mockResolvedValue('');
      const findByTokenSpy = jest.spyOn(userRepository, 'findByToken');
      const updatePassword = jest.spyOn(userRepository, 'updatePassword');
      const { status, data } = await service.execute({
        recoverPasswordToken: '123',
        password: 'password',
        confirmPassword: 'password',
      });
      expect(status).toEqual(400);
      expect(data).toEqual({ message: 'User not found' });
      expect(findByTokenSpy).toBeCalled();
      expect(findByTokenSpy).toBeCalledTimes(1);
      expect(updatePassword).not.toBeCalled();
    });

    it('should be able to return an error when password mismatch', async () => {
      userRepository.findByToken = jest.fn().mockResolvedValue(userMock());
      const findByTokenSpy = jest.spyOn(userRepository, 'findByToken');
      const updatePassword = jest.spyOn(userRepository, 'updatePassword');
      const { status, data } = await service.execute({
        recoverPasswordToken: '123',
        password: 'password',
        confirmPassword: 'teste',
      });
      expect(status).toEqual(400);
      expect(data).toEqual({ message: 'Password mismatch' });
      expect(findByTokenSpy).toBeCalled();
      expect(findByTokenSpy).toBeCalledTimes(1);
      expect(updatePassword).not.toBeCalled();
    });

    it('should be able to return an updated user', async () => {
      userRepository.findByToken = jest.fn().mockResolvedValue(userMock());
      userRepository.updatePassword = jest.fn().mockResolvedValue(userMock());
      const findByTokenSpy = jest.spyOn(userRepository, 'findByToken');
      const updatePassword = jest.spyOn(userRepository, 'updatePassword');
      const { status, data } = await service.execute({
        recoverPasswordToken: '123',
        password: 'password',
        confirmPassword: 'password',
      });
      expect(status).toEqual(200);
      expect(data).toEqual(userMock());
      expect(findByTokenSpy).toBeCalled();
      expect(findByTokenSpy).toBeCalledTimes(1);
      expect(updatePassword).toBeCalled();
      expect(updatePassword).toBeCalledTimes(1);
    });
  });
});
