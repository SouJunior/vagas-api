import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { PublishJobService } from '../../../../src/modules/jobs/services/publish-job.service';
import { JobRepository } from '../../../../src/modules/jobs/repository/job.repository';
import { JobStatus } from '../../../../src/modules/jobs/enums/job-status.enum';
import { JobsTypeContractEnum } from '../../../../src/modules/jobs/enums/job-contract-type.enum';

class JobRepositoryMock {
  findOneById = jest.fn();
  publishJob = jest.fn();
}

describe('PublishJobService', () => {
  let service: PublishJobService;
  let jobRepository: JobRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublishJobService,
        {
          provide: JobRepository,
          useClass: JobRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(PublishJobService);
    jobRepository = module.get(JobRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const mockCompleteData = {
      description: 'Job description',
      requirements: ['Node.js', 'TypeScript'],
      benefits: ['Health insurance'],
      contractType: JobsTypeContractEnum.CLT,
      journey: '40 hours/week',
      selectionProcess: ['Interview', 'Technical test'],
    };

    it('should throw error when job not found', async () => {
      jobRepository.findOneById = jest.fn().mockResolvedValue(null);

      await expect(service.execute('job-id', mockCompleteData)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.execute('job-id', mockCompleteData)).rejects.toThrow(
        'Job not found',
      );
    });

    it('should throw error when job is not draft', async () => {
      const publishedJob = {
        id: 'job-id',
        jobStatus: JobStatus.PUBLISHED,
      };

      jobRepository.findOneById = jest.fn().mockResolvedValue(publishedJob);

      await expect(service.execute('job-id', mockCompleteData)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.execute('job-id', mockCompleteData)).rejects.toThrow(
        'Only draft jobs can be published',
      );
    });

    it('should publish draft job successfully', async () => {
      const draftJob = {
        id: 'job-id',
        jobStatus: JobStatus.DRAFT,
      };

      const publishedJob = {
        id: 'job-id',
        jobStatus: JobStatus.PUBLISHED,
        publishedAt: new Date(),
      };

      jobRepository.findOneById = jest.fn().mockResolvedValue(draftJob);
      jobRepository.publishJob = jest.fn().mockResolvedValue(publishedJob);

      const result = await service.execute('job-id', mockCompleteData);

      expect(result).toEqual({
        id: 'job-id',
        status: JobStatus.PUBLISHED,
        publishedAt: expect.any(Date),
        message: 'Job published successfully',
      });
      expect(jobRepository.publishJob).toHaveBeenCalledWith(
        'job-id',
        mockCompleteData,
      );
    });
  });
});
