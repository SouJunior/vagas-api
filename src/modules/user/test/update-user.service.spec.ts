import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repository/user.repository';
import { UpdateUserService } from '../services/update-user.service';

class UserRepositoryMock {
  createUser = jest.fn();
  getAllUsers = jest.fn();
  searchUserByName = jest.fn();
  findOneById = jest.fn();
  findOneByEmail = jest.fn();
  updateUser = jest.fn();
  deleteUserById = jest.fn();
}

describe('UpdateUserService', () => {
  let service: UpdateUserService;
  let userRepository: UserRepositoryMock;

  enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
  }

  const user1: CreateUserDto = {
    email: 'jhonas@brother.com',
    name: 'Jhonas',
    password: 'zarabara',
    type: UserRole.USER,
  };

  const user2: CreateUserDto = {
    email: 'castro@brothers.com',
    name: 'Castro',
    password: 'zarabara',
    type: UserRole.USER,
  };

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

  test('should not be able to update when user not exist.', () => {
    it('should', async () => {
      const newUser = await userRepository.createUser(user1);
      const data = {
        name: 'Alex',
      };
      // const result = await service.execute(id, data);

      expect(await service.execute(newUser.id, data)).toContain({
        name: 'alex',
      });
    });
  });
});
