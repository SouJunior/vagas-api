import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../../src/modules/user/repository/user.repository';
import { DeleteUserService } from '../../../../src/modules/user/services/delete-user.service';
import { userMock } from '../../../mocks/user/user.mock';

class UserRepositoryMock {
  findOneById = jest.fn();
  deleteUserById = jest.fn();
}

describe('DeleteUserService', () => {
  let service: DeleteUserService;
  let userRepository: UserRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteUserService],
      providers: [
        {
          provide: UserRepository,
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(DeleteUserService);
    userRepository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should be able to return an error when is not provide', async () => {
      const findOneByIdSpy = jest.spyOn(userRepository, 'findOneById');
      const deleteUserByIdSpy = jest.spyOn(userRepository, 'deleteUserById');
      expect(async () => {
        await service.execute('');
      }).rejects.toThrow('Id not provided');
      expect(findOneByIdSpy).not.toBeCalled();
      expect(deleteUserByIdSpy).not.toBeCalled();
    });

    it('should be able to return an error when user not found', async () => {
      userRepository.findOneById = jest.fn().mockResolvedValue('');
      const findOneByIdSpy = jest.spyOn(userRepository, 'findOneById');
      const deleteUserByIdSpy = jest.spyOn(userRepository, 'deleteUserById');
      expect(async () => {
        await service.execute('123');
      }).rejects.toThrow('User not found');
      expect(findOneByIdSpy).toBeCalled();
      expect(findOneByIdSpy).toBeCalledTimes(1);
      expect(deleteUserByIdSpy).not.toBeCalled();
    });

    it('should be able to delete an user', async () => {
      userRepository.findOneById = jest.fn().mockResolvedValue(userMock());
      userRepository.deleteUserById = jest
        .fn()
        .mockResolvedValue({ message: 'User deleted successfully' });
      const findOneByIdSpy = jest.spyOn(userRepository, 'findOneById');
      const deleteUserByIdSpy = jest.spyOn(userRepository, 'deleteUserById');
      const response = await service.execute('123');
      expect(response).toEqual({ message: 'User deleted successfully' });
      expect(findOneByIdSpy).toBeCalled();
      expect(findOneByIdSpy).toBeCalledTimes(1);
      expect(deleteUserByIdSpy).toBeCalled();
      expect(deleteUserByIdSpy).toBeCalledTimes(1);
    });
  });
});
