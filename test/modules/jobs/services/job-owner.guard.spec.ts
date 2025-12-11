import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { JobOwnerGuard } from '../../../../src/modules/jobs/guards/job-owner.guard';
import { JobRepository } from '../../../../src/modules/jobs/repository/job.repository';

class JobRepositoryMock {
  findOneById = jest.fn();
}

describe('JobOwnerGuard', () => {
  let guard: JobOwnerGuard;
  let jobRepository: JobRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobOwnerGuard,
        {
          provide: JobRepository,
          useClass: JobRepositoryMock,
        },
      ],
    }).compile();

    guard = module.get(JobOwnerGuard);
    jobRepository = module.get(JobRepository);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    const mockExecutionContext = (user: any, jobId: string) => {
      return {
        switchToHttp: () => ({
          getRequest: () => ({
            user,
            params: { id: jobId },
          }),
        }),
      } as ExecutionContext;
    };

    it('should throw ForbiddenException when user not authenticated', async () => {
      const context = mockExecutionContext(null, 'job-id');

      await expect(guard.canActivate(context)).rejects.toThrow(
        ForbiddenException,
      );
      await expect(guard.canActivate(context)).rejects.toThrow(
        'User not authenticated',
      );
    });

    it('should throw NotFoundException when job not found', async () => {
      const user = { id: 'company-id' };
      const context = mockExecutionContext(user, 'job-id');

      jobRepository.findOneById = jest.fn().mockResolvedValue(null);

      await expect(guard.canActivate(context)).rejects.toThrow(
        NotFoundException,
      );
      await expect(guard.canActivate(context)).rejects.toThrow('Job not found');
    });

    it('should throw ForbiddenException when user is not owner', async () => {
      const user = { id: 'company-id' };
      const context = mockExecutionContext(user, 'job-id');
      const job = {
        id: 'job-id',
        company_id: 'other-company-id',
      };

      jobRepository.findOneById = jest.fn().mockResolvedValue(job);

      await expect(guard.canActivate(context)).rejects.toThrow(
        ForbiddenException,
      );
      await expect(guard.canActivate(context)).rejects.toThrow(
        'You do not have permission to modify this job',
      );
    });

    it('should allow access when user is owner', async () => {
      const user = { id: 'company-id' };
      const context = mockExecutionContext(user, 'job-id');
      const job = {
        id: 'job-id',
        company_id: 'company-id',
      };

      jobRepository.findOneById = jest.fn().mockResolvedValue(job);

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });
  });
});
