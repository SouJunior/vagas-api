import { Test, TestingModule } from '@nestjs/testing';
import { CandidacyService } from './candidacy.service';
import { CandidacyRepository } from '../repository/candidacy.repository';

const createCandidacyRepositoryMock = (): jest.Mocked<
  Partial<CandidacyRepository>
> => ({
  createCandidacy: jest.fn(),
  findAllByUserId: jest.fn(),
  updateStatus: jest.fn(),
});

describe('CandidacyService', () => {
  let service: CandidacyService;
  let candidacyRepository: jest.Mocked<Partial<CandidacyRepository>>;

  beforeEach(async () => {
    candidacyRepository = createCandidacyRepositoryMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidacyService,
        {
          provide: CandidacyRepository,
          useValue: candidacyRepository,
        },
      ],
    }).compile();

    service = module.get<CandidacyService>(CandidacyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
