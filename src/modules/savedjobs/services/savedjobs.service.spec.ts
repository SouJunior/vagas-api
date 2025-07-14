import { Test, TestingModule } from '@nestjs/testing';
import { SavedJobsService } from './savedjobs.service';

describe('SavedjobsService', () => {
  let service: SavedJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedJobsService],
    }).compile();

    service = module.get<SavedJobsService>(SavedJobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
