import { Test, TestingModule } from '@nestjs/testing';
import { AlertasService } from './alertas.service';

describe('AlertasService', () => {
  let service: AlertasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlertasService],
    }).compile();

    service = module.get<AlertasService>(AlertasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
