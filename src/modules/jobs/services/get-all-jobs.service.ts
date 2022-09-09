import { Injectable } from '@nestjs/common';
import { JobRepository } from '../repository/job.resository';

@Injectable()
export class GetAllJobsService {
  constructor(private jobRepository: JobRepository) {}

  async execute() {
    const jobs = await this.jobRepository.getAllJobs();

    if (jobs.length <= 0) {
      return { message: 'Jobs is empty' };
    }

    return jobs;
  }
}
