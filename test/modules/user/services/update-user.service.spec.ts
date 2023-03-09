import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../../src/modules/user/repository/user.repository';
import { UpdateUserService } from '../../../../src/modules/user/services/update-user.service';
import { userUpdateMock } from '../../../mocks/user/user-update.mock';
import { userMock } from '../../../mocks/user/user.mock';

class UserRepositoryMock {
  findOneById = jest.fn();
  updateUser = jest.fn();
}

describe('UpdateUserService', () => {
  let service: UpdateUserService;
  let userRepository: UserRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateUserService],
      providers: [
        {
          provide: UserRepository,
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(UpdateUserService);
    userRepository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should be able to return an error when id not provide', () => {
      const findOneByIdSpy = jest.spyOn(userRepository, 'findOneById');
      const updateUserSpy = jest.spyOn(userRepository, 'updateUser');
      expect(async () => {
        await service.execute('', userMock());
      }).rejects.toThrow('Id not provided');
      expect(findOneByIdSpy).not.toHaveBeenCalled();
      expect(updateUserSpy).not.toHaveBeenCalled();
    });

    it('should be able to return an error when user not found', () => {
      userRepository.findOneById = jest.fn().mockResolvedValue('');
      const findOneByIdSpy = jest.spyOn(userRepository, 'findOneById');
      const updateUserSpy = jest.spyOn(userRepository, 'updateUser');
      expect(async () => {
        await service.execute('123', userMock());
      }).rejects.toThrow('User not found');
      expect(findOneByIdSpy).toHaveBeenCalled();
      expect(findOneByIdSpy).toBeCalledTimes(1);
      expect(updateUserSpy).not.toHaveBeenCalled();
    });

    it('should be able to update an user', async () => {
      userRepository.findOneById = jest.fn().mockResolvedValue(userMock());
      userRepository.updateUser = jest.fn().mockResolvedValue(userMock());
      const findOneByIdSpy = jest.spyOn(userRepository, 'findOneById');
      const updateUserSpy = jest.spyOn(userRepository, 'updateUser');
      const response = await service.execute('123', userMock());
      expect(response).toEqual(userMock());
      expect(findOneByIdSpy).toHaveBeenCalled();
      expect(findOneByIdSpy).toBeCalledTimes(1);
      expect(updateUserSpy).toHaveBeenCalled();
      expect(updateUserSpy).toBeCalledTimes(1);
    });

    it('should be able to update an user when data has password ', async () => {
      userRepository.findOneById = jest.fn().mockResolvedValue(userMock());
      userRepository.updateUser = jest.fn().mockResolvedValue(userMock());
      const findOneByIdSpy = jest.spyOn(userRepository, 'findOneById');
      const updateUserSpy = jest.spyOn(userRepository, 'updateUser');
      const response = await service.execute('123', userUpdateMock());
      expect(response).toEqual(userMock());
      expect(findOneByIdSpy).toHaveBeenCalled();
      expect(findOneByIdSpy).toBeCalledTimes(1);
      expect(updateUserSpy).toHaveBeenCalled();
      expect(updateUserSpy).toBeCalledTimes(1);
    });
  });
});
