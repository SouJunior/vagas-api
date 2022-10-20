import { PassportModule } from '@nestjs/passport';
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
    it('should be able to create a user', async () => {
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

      userRepository.createUser(user);

      const result = userRepository.findOneByEmail(user.email);

      expect(result).toContain(result.data.email);
    });
  });
});
