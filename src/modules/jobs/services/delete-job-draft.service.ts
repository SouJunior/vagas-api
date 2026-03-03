import { BadRequestException, Injectable } from '@nestjs/common';
import { JobStatus } from '../enums/job-status.enum';
import { JobRepository } from '../repository/job.repository';

@Injectable()
export class DeleteJobDraftService {
  constructor(private jobRepository: JobRepository) {}

  async execute(jobId: string) {
    const job = await this.jobRepository.findOneById(jobId);

    if (!job) {
      throw new BadRequestException('Job not found');
    }

    if (job.jobStatus !== JobStatus.DRAFT) {
      throw new BadRequestException('Only draft jobs can be deleted');
    }

    await this.jobRepository.deleteJobDraft(jobId);

    return {
      message: 'Draft deleted successfully',
    };
  }
}
