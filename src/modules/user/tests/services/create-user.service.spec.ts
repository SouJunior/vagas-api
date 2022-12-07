import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UserRepository } from '../../repository/user.repository';
import { CreateUserService } from '../../services/create-user.service';

enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

const newUser = [
  {
    id: 'any-id-string',
    name: 'nomeTeste',
    email: 'emailTeste@teste.com',
    password: '123456',
    type: UserRole.USER,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

class UserRepositoryMock {
  createUser = jest.fn();
  getAllUsers = jest.fn().mockReturnValueOnce(newUser);
  searchUserByName = jest.fn();
  findOneById = jest.fn();
  findOneByEmail = jest.fn().mockResolvedValueOnce(newUser[0]);
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

    service = module.get<CreateUserService>(CreateUserService);
    userRepository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should be able to create a new user', async () => {
      userRepository.findOneByEmail = jest.fn();
      userRepository.createUser = jest.fn().mockResolvedValueOnce(newUser[0]);

      enum UserRole {
        ADMIN = 'ADMIN',
        USER = 'USER',
      }

      const user: CreateUserDto = {
        name: 'nomeTeste',
        email: 'emailTeste@teste.com',
        password: '123456',
        type: UserRole.USER,
      };

      const result = await service.execute(user);

      expect(result).toEqual(newUser[0]);
    });
  });

  it('should not be able to create a new user when email already exists', () => {
    expect(async () => {
      enum UserRole {
        ADMIN = 'ADMIN',
        USER = 'USER',
      }

      const user: CreateUserDto = {
        name: 'nomeTeste2',
        email: 'emailTeste2@teste.com',
        password: '123456',
        type: UserRole.USER,
      };

      await service.execute(user);
    }).rejects.toThrow(
      new BadRequestException(`Email emailTeste2@teste.com already exists`),
    );
  });
});
