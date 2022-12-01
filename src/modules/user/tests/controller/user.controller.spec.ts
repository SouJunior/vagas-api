import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../../dtos/create-user.dto';
import {
  CreateUserService,
  DeleteUserService,
  FindAllUsersService,
  FindOneUserService,
  UpdateUserService,
} from '../../services';
import { UserController } from '../../user.controller';

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
  let controller: UserController;
  let createUserService: CreateUserServiceMock;
  let findOneUserService: FindOneUserServiceMock;
  let findAllUsersService: FindAllUsersServiceMock;
  let updateUserService: UpdateUserServiceMock;
  let deleteUserService: DeleteUserServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
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

    controller = module.get(UserController);
    createUserService = module.get(CreateUserService);
    findOneUserService = module.get(FindOneUserService);
    findAllUsersService = module.get(FindAllUsersService);
    updateUserService = module.get(UpdateUserService);
    deleteUserService = module.get(DeleteUserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createNewUser', () => {
    it('should be defined', () => {
      expect(createUserService).toBeDefined();
    });
  });

  describe('getAllUsers', () => {
    it('should be defined', () => {
      expect(findOneUserService).toBeDefined();
    });
  });

  describe('getOneUser', () => {
    it('should be defined', () => {
      expect(findAllUsersService).toBeDefined();
    });
  });

  describe('updateUser', () => {
    it('should be defined', () => {
      expect(updateUserService).toBeDefined();
    });
  });

  describe('deleteUser', () => {
    it('should be defined', () => {
      expect(deleteUserService).toBeDefined();
    });
  });
});
