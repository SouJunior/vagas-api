import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UserRepository } from '../../repository/user.repository';
import { CreateUserService } from '../../services/create-user.service';

class UserRepositoryMock {
  createUser = jest.fn();
  getAllUsers = jest.fn();
  searchUserByName = jest.fn();
  findOneById = jest.fn();
  findOneByEmail = jest.fn();
  updateUser = jest.fn();
  deleteUserById = jest.fn();
}

describe('CreateUserService', () => {
  let service: CreateUserService;
  let userRepository: UserRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserService],
      providers: [
        {
          provide: UserRepository,
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(CreateUserService);
    userRepository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should not be able to create a user when email allready exists', async () => {
      enum UserRole {
        ADMIN = 'ADMIN',
        USER = 'USER',
      }

      const user: CreateUserDto = {
        name: 'Teste Name',
        email: 'teste@teste.com',
        password: '123456',
        type: UserRole.USER,
      };

      service.execute(user);

      const result = service.execute(user);

      expect(result).not.toEqual(user);
    });
  });
});
