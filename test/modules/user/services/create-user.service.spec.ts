import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../../src/modules/user/repository/user.repository';
import { CreateUserService } from '../../../../src/modules/user/services';
import { createUserMock } from '../../../mocks/user/create-user.mock';
import { userMock } from '../../../mocks/user/user.mock';

class UserRepositoryMock {
  createUser = jest.fn();
  findOneByEmail = jest.fn();
  findOneByCpf = jest.fn();
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
    it('should be able to return a error when email exists', async () => {
      userRepository.findOneByEmail = jest
        .fn()
        .mockResolvedValue(createUserMock());
      const findOneByEmailSpy = jest.spyOn(userRepository, 'findOneByEmail');
      const findOneByCpfSpy = jest.spyOn(userRepository, 'findOneByCpf');
      const createUserSpy = jest.spyOn(userRepository, 'createUser');
      const createUserDto = createUserMock();
      const { data, status } = await service.execute(createUserDto);
      expect(status).toEqual(404);
      expect(data).toEqual({
        message: 'Email already exists',
      });
      expect(findOneByEmailSpy).toBeCalled();
      expect(findOneByEmailSpy).toBeCalledTimes(1);
      expect(findOneByCpfSpy).not.toBeCalled();
      expect(createUserSpy).not.toBeCalled();
    });

    it('should be able to return a error when cpf exists', async () => {
      userRepository.findOneByEmail = jest.fn().mockResolvedValue('');
      userRepository.findOneByCpf = jest
        .fn()
        .mockResolvedValue(createUserMock());
      const findOneByEmailSpy = jest.spyOn(userRepository, 'findOneByEmail');
      const findOneByCpfSpy = jest.spyOn(userRepository, 'findOneByCpf');
      const createUserSpy = jest.spyOn(userRepository, 'createUser');
      const createUserDto = createUserMock();
      const { data, status } = await service.execute(createUserDto);
      expect(status).toEqual(404);
      expect(data).toEqual({
        message: `This CPF is already in use`,
      });
      expect(findOneByEmailSpy).toBeCalled();
      expect(findOneByEmailSpy).toBeCalledTimes(1);
      expect(findOneByCpfSpy).toBeCalled();
      expect(findOneByCpfSpy).toBeCalledTimes(1);
      expect(createUserSpy).not.toBeCalled();
    });

    it('should be able to create an user', async () => {
      userRepository.findOneByEmail = jest.fn().mockResolvedValue('');
      userRepository.findOneByCpf = jest.fn().mockResolvedValue('');
      userRepository.createUser = jest.fn().mockResolvedValue(userMock());
      const findOneByEmailSpy = jest.spyOn(userRepository, 'findOneByEmail');
      const findOneByCpfSpy = jest.spyOn(userRepository, 'findOneByCpf');
      const createUserSpy = jest.spyOn(userRepository, 'createUser');
      const createUserDto = createUserMock();
      const { data, status } = await service.execute(createUserDto);
      expect(status).toEqual(201);
      expect(data).toEqual(userMock());
      expect(findOneByEmailSpy).toBeCalled();
      expect(findOneByEmailSpy).toBeCalledTimes(1);
      expect(findOneByCpfSpy).toBeCalled();
      expect(findOneByCpfSpy).toBeCalledTimes(1);
      expect(createUserSpy).toBeCalled();
      expect(createUserSpy).toBeCalledTimes(1);
    });
  });
});
