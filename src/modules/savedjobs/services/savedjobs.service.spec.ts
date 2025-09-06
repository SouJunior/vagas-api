import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SavedJobsService } from './savedjobs.service';
import { SavedJobsEntity } from '../../../database/entities/savedjobs.entity';
import { UsersEntity } from '../../../database/entities/users.entity';
import { JobsEntity } from '../../../database/entities/jobs.entity';

const createRepositoryMock = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
});

describe('SavedjobsService', () => {
  let service: SavedJobsService;
  let savedJobsRepository: any;
  let usersRepository: any;
  let jobsRepository: any;

  beforeEach(async () => {
    savedJobsRepository = createRepositoryMock();
    usersRepository = createRepositoryMock();
    jobsRepository = createRepositoryMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SavedJobsService,
        {
          provide: getRepositoryToken(SavedJobsEntity),
          useValue: savedJobsRepository,
        },
        {
          provide: getRepositoryToken(UsersEntity),
          useValue: usersRepository,
        },
        {
          provide: getRepositoryToken(JobsEntity),
          useValue: jobsRepository,
        },
      ],
    }).compile();

    service = module.get<SavedJobsService>(SavedJobsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
