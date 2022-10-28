import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateUserService,
  DeleteUserService,
  FindAllUsersService,
  FindOneUserService,
  UpdateUserService,
} from '../services';
import { UserController } from '../user.controller';

describe('UserController', () => {
  let userController: UserController;
  let updateUserService: UpdateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        CreateUserService,
        FindOneUserService,
        FindAllUsersService,
        UpdateUserService,
        DeleteUserService,
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    updateUserService = module.get<UpdateUserService>(UpdateUserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(updateUserService).toBeDefined();
  });
});
