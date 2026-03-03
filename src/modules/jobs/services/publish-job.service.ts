import { BadRequestException, Injectable } from '@nestjs/common';
import { JobStatus } from '../enums/job-status.enum';
import { CompleteJobDto } from '../dtos/complete-job.dto';
import { JobRepository } from '../repository/job.repository';

@Injectable()
export class PublishJobService {
  constructor(private jobRepository: JobRepository) {}

  async execute(jobId: string, completeData: CompleteJobDto) {
    const job = await this.jobRepository.findOneById(jobId);

    if (!job) {
      throw new BadRequestException('Job not found');
    }

    if (job.jobStatus !== JobStatus.DRAFT) {
      throw new BadRequestException('Only draft jobs can be published');
    }

    const publishedJob = await this.jobRepository.publishJob(
      jobId,
      completeData,
    );

    return {
      id: publishedJob.id,
      status: publishedJob.jobStatus,
      publishedAt: publishedJob.publishedAt,
      message: 'Job published successfully',
    };
  }
}
