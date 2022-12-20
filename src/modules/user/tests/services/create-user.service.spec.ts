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
    cpf: 'cpfTeste',
    policies: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

class UserRepositoryMock {
  createUser = jest.fn();
  getAllUsers = jest.fn();
  searchUserByName = jest.fn();
  findOneById = jest.fn();
  findOneByEmail = jest.fn();
  findOneByCpf = jest.fn();
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
      userRepository.createUser = jest.fn().mockResolvedValueOnce(newUser[0]);

      enum UserRole {
        ADMIN = 'ADMIN',
        USER = 'USER',
      }

      const user: CreateUserDto = {
        name: 'nomeTeste',
        email: 'emailTeste@teste.com',
        password: '123456',
        cpf: 'cpfTeste',
        policies: true,
        type: UserRole.USER,
      };

      const result = await service.execute(user);

      expect(result).toEqual(newUser[0]);
    });
  });

  it('should not be able to create a new user when email already exists', () => {
    userRepository.findOneByEmail = jest.fn().mockResolvedValueOnce(newUser[0]);
    expect(async () => {
      enum UserRole {
        ADMIN = 'ADMIN',
        USER = 'USER',
      }

      const user: CreateUserDto = {
        name: 'nomeTeste2',
        email: 'emailTeste2@teste.com',
        password: '123456',
        cpf: 'cpfTeste',
        policies: true,
        type: UserRole.USER,
      };

      await service.execute(user);
    }).rejects.toThrow(
      new BadRequestException(`Email emailTeste2@teste.com already exists`),
    );
  });

  it('should not be able to create a new user when CPF already exists', () => {
    userRepository.findOneByCpf = jest.fn().mockResolvedValueOnce(newUser[0]);
    expect(async () => {
      enum UserRole {
        ADMIN = 'ADMIN',
        USER = 'USER',
      }

      const user: CreateUserDto = {
        name: 'nomeTeste2',
        email: 'emailTeste2@teste.com',
        password: '123456',
        cpf: 'cpfTeste',
        policies: true,
        type: UserRole.USER,
      };

      await service.execute(user);
    }).rejects.toThrow(new BadRequestException(`This CPF is already in use`));
  });
});
