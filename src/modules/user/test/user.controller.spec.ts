import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateUserService,
  DeleteUserService,
  FindAllUsersService,
  FindOneUserService,
  UpdateUserService,
} from '../services';
import { UserController } from '../user.controller';

class CreateUserServiceMock {
  execute = jest.fn();
}

class FindOneUserServiceMock {
  execute = jest.fn();
}

class FindAllUsersServiceMock {
  execute = jest.fn();
}

class UpdateUserServiceMock {
  execute = jest.fn();
}

class DeleteUserServiceMock {
  execute = jest.fn();
}

describe('UserController', () => {
  let service: UserController;
  let createUserService: CreateUserServiceMock;
  let findOneUserService: FindOneUserServiceMock;
  let findAllUsersService: FindAllUsersServiceMock;
  let updateUserService: UpdateUserServiceMock;
  let deleteUserService: DeleteUserServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserService,
          useClass: CreateUserServiceMock,
        },
        {
          provide: FindOneUserService,
          useClass: FindOneUserServiceMock,
        },
        {
          provide: FindAllUsersService,
          useClass: FindAllUsersServiceMock,
        },
        {
          provide: UpdateUserService,
          useClass: UpdateUserServiceMock,
        },
        {
          provide: DeleteUserService,
          useClass: DeleteUserServiceMock,
        },
      ],
    }).compile();

    service = module.get(UserController);
    createUserService = module.get(CreateUserService);
    findOneUserService = module.get(FindOneUserService);
    findAllUsersService = module.get(FindAllUsersService);
    updateUserService = module.get(UpdateUserService);
    deleteUserService = module.get(DeleteUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNewJob', () => {
    it('should', () => {
      expect(createUserService).toBeDefined();
    });
  });

  describe('getAllJobs', () => {
    it('should', () => {});
  });

  describe('getOneJob', () => {
    it('should', () => {});
  });

  describe('updateJob', () => {
    it('should', () => {});
  });

  describe('deleteJob', () => {
    it('should', () => {});
  });
});
