import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../../../src/modules/user/repository/user.repository';
import { FindAllUsersService } from '../../../../src/modules/user/services/find-all-users.service';
import { Order, PageOptionsDto } from '../../../../src/shared/pagination';
import { getAllUserMock } from '../../../mocks/user/get-all-user.mock';

const createUserRepositoryMock = (): jest.Mocked<Partial<UserRepository>> => ({
  getAllUsers: jest.fn(),
});

describe('FindAllUsersService', () => {
  let service: FindAllUsersService;
  let userRepository: jest.Mocked<Partial<UserRepository>>;

  beforeEach(async () => {
    userRepository = createUserRepositoryMock();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindAllUsersService],
      providers: [
        {
          provide: UserRepository,
          useValue: userRepository,
        },
      ],
    }).compile();

    service = module.get(FindAllUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should be able to return an array of user and pagination', async () => {
      userRepository.getAllUsers = jest
        .fn()
        .mockResolvedValue(getAllUserMock());
      const getAllUsersSpy = jest.spyOn(userRepository, 'getAllUsers');
      const pageOptionsDto: PageOptionsDto = {
        orderByColumn: 'name',
        page: 1,
        take: 5,
        order: Order.ASC,
      };
      const response = await service.execute(pageOptionsDto);
      expect(response).toEqual(getAllUserMock());
      expect(getAllUsersSpy).toBeCalled();
      expect(getAllUsersSpy).toBeCalledTimes(1);
    });
  });
});
