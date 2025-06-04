import { Test, TestingModule } from '@nestjs/testing';
import { CandidacyService } from './candidacy.service';

describe('CandidacyService', () => {
  let service: CandidacyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CandidacyService],
    }).compile();

    service = module.get<CandidacyService>(CandidacyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
