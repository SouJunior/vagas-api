import { BadRequestException, Injectable } from '@nestjs/common';
import { JobStatus } from '../enums/job-status.enum';
import { JobRepository } from '../repository/job.repository';

@Injectable()
export class CancelJobService {
  constructor(private jobRepository: JobRepository) {}

  async execute(jobId: string) {
    const job = await this.jobRepository.findOneById(jobId);

    if (!job) {
      throw new BadRequestException('Job not found');
    }

    if (job.jobStatus !== JobStatus.PUBLISHED) {
      throw new BadRequestException('Only published jobs can be canceled');
    }

    const canceledJob = await this.jobRepository.cancelJob(jobId);

    return {
      id: canceledJob.id,
      status: canceledJob.jobStatus,
      canceledAt: canceledJob.canceledAt,
      message: 'Job canceled successfully',
    };
  }
}
