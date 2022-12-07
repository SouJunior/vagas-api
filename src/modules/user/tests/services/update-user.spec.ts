import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../../../../database/entities/users.entity';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { UserRepository } from '../../repository/user.repository';
import { UpdateUserService } from '../../services/update-user.service';

enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

const testUpdatedData: UpdateUserDto = {
  email: 'any_email@mail.com',
  name: 'any_name',
  password: 'any_password',
  type: UserRole.USER,
};
const testUser = new UserEntity({
  id: 1,
  email: 'any_email@mail.com',
  name: 'any_name',
  password: 'any_password',
  type: UserRole.USER,
  created_at: new Date(),
  updated_at: new Date(),
});

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
    expect(userRepository).toBeDefined();
  });

  it('should be able to Update an user with correct Data', async () => {
    userRepository.findOneById = jest.fn().mockResolvedValueOnce(testUser);
    userRepository.updateUser = jest.fn().mockResolvedValueOnce(testUser);

    const result = await service.execute(testUser.id, testUpdatedData);
    expect(result).toBe(testUser);
  });

  it('should not return user password when updated.', async () => {
    userRepository.findOneById = jest.fn().mockResolvedValueOnce(testUser);
    userRepository.updateUser = jest.fn().mockResolvedValueOnce(testUser);

    const result = await service.execute(testUser.id, testUpdatedData);
    expect(result).toEqual(
      expect.not.objectContaining({ password: expect.any(String) }),
    );
  });

  it('should throw if id is missing', async () => {
    expect(async () => {
      const invalidId = undefined;

      await service.execute(invalidId, testUpdatedData);
    }).rejects.toThrow(new BadRequestException('Id not provided'));
  });

  it('should throw if id is not valid', async () => {
    expect(async () => {
      const invalidId = -1;

      await service.execute(invalidId, testUpdatedData);
    }).rejects.toThrow(new BadRequestException('Invalid Id'));
  });

  it('should throw if user does not exist', async () => {
    expect(async () => {
      await service.execute(testUser.id, testUpdatedData);
    }).rejects.toThrow(new NotFoundException('User not found'));
  });
});
