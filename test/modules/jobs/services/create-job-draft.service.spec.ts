import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CreateJobDraftService } from '../../../../src/modules/jobs/services/create-job-draft.service';
import { JobRepository } from '../../../../src/modules/jobs/repository/job.repository';
import { JobsModalityEnum } from '../../../../src/modules/jobs/enums/job-modality.enum';
import { JobStatus } from '../../../../src/modules/jobs/enums/job-status.enum';

class JobRepositoryMock {
  createJobDraft = jest.fn();
}

describe('CreateJobDraftService', () => {
  let service: CreateJobDraftService;
  let jobRepository: JobRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateJobDraftService,
        {
          provide: JobRepository,
          useClass: JobRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(CreateJobDraftService);
    jobRepository = module.get(JobRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const mockCompany = {
      id: 'company-id',
      companyName: 'Test Company',
    } as any;

    const mockDraftData = {
      title: 'Backend Developer',
      interestArea: 'Technology',
      modality: JobsModalityEnum.REMOTE,
      salaryMin: 3000,
      salaryMax: 5000,
    };

    it('should throw error when salaryMin > salaryMax', async () => {
      const invalidData = {
        ...mockDraftData,
        salaryMin: 6000,
        salaryMax: 5000,
      };

      await expect(service.execute(invalidData, mockCompany)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.execute(invalidData, mockCompany)).rejects.toThrow(
        'Salary minimum cannot be greater than salary maximum',
      );
    });

    it('should create draft with correct status', async () => {
      const mockDraft = {
        id: 'draft-id',
        ...mockDraftData,
        company_id: mockCompany.id,
        jobStatus: JobStatus.DRAFT,
      };

      jobRepository.createJobDraft = jest.fn().mockResolvedValue(mockDraft);

      const result = await service.execute(mockDraftData, mockCompany);

      expect(result).toEqual({
        id: 'draft-id',
        status: JobStatus.DRAFT,
        message: 'Draft created successfully',
      });
      expect(jobRepository.createJobDraft).toHaveBeenCalledWith({
        ...mockDraftData,
        company_id: mockCompany.id,
      });
    });

    it('should link draft to logged company', async () => {
      const mockDraft = {
        id: 'draft-id',
        ...mockDraftData,
        company_id: mockCompany.id,
        jobStatus: JobStatus.DRAFT,
      };

      jobRepository.createJobDraft = jest.fn().mockResolvedValue(mockDraft);

      await service.execute(mockDraftData, mockCompany);

      expect(jobRepository.createJobDraft).toHaveBeenCalledWith(
        expect.objectContaining({
          company_id: mockCompany.id,
        }),
      );
    });
  });
});
