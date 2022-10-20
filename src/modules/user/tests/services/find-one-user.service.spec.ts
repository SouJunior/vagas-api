import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../repository/user.repository';
import { FindOneUserService } from '../../services/find-one-user.service';

class UserRepositoryMock {
  createUser = jest.fn();
  getAllUsers = jest.fn();
  searchUserByName = jest.fn();
  findOneById = jest.fn();
  findOneByEmail = jest.fn();
  updateUser = jest.fn();
  deleteUserById = jest.fn();
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
    it('should', () => {});
  });
});
