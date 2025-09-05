import { Injectable } from '@nestjs/common';
import { JobRepository } from '../repository/job.repository';

@Injectable()
export class GetAllJobsFromLoggedCompanyService {
  constructor(private jobsRepository: JobRepository) {}

  async execute(companyId: string) {
    const jobs = await this.jobsRepository.getAllJobsByCompanyId(companyId);

    return {
      message: 'Logged company jobs listed successfully.',
      content: jobs || [],
    };
  }
}
