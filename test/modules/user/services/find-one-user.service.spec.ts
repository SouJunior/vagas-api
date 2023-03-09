import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../../src/modules/user/repository/user.repository';
import { FindOneUserService } from '../../../../src/modules/user/services/find-one-user.service';
import { userMock } from '../../../mocks/user/user.mock';

class UserRepositoryMock {
  findOneById = jest.fn();
}

describe('FindOneUserService', () => {
  let service: FindOneUserService;
  let userRepository: UserRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindOneUserService],
      providers: [
        {
          provide: UserRepository,
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(FindOneUserService);
    userRepository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should be able to return an error when id not provide', () => {
      const findOneByIdSpy = jest.spyOn(userRepository, 'findOneById');
      expect(async () => {
        await service.execute('');
      }).rejects.toThrow('Id not provider');
      expect(findOneByIdSpy).not.toHaveBeenCalled();
    });

    it('should be able to return an error when user not found', () => {
      userRepository.findOneById = jest.fn().mockResolvedValue('');
      const findOneByIdSpy = jest.spyOn(userRepository, 'findOneById');
      expect(async () => {
        await service.execute('123');
      }).rejects.toThrow('User not found');
      expect(findOneByIdSpy).toHaveBeenCalled();
      expect(findOneByIdSpy).toBeCalledTimes(1);
    });

    it('should be able to return an user', async () => {
      userRepository.findOneById = jest.fn().mockResolvedValue(userMock());
      const findOneByIdSpy = jest.spyOn(userRepository, 'findOneById');
      const response = await service.execute('123');
      expect(response).toEqual(userMock());
      expect(findOneByIdSpy).toHaveBeenCalled();
      expect(findOneByIdSpy).toBeCalledTimes(1);
    });
  });
});
