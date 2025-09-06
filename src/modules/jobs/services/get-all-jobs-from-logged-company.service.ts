import { Injectable } from '@nestjs/common';
import { JobRepository } from '../repository/job.repository';
import { IJobsResponse } from '../interfaces/interfaces';

@Injectable()
export class GetAllJobsFromLoggedCompanyService {
  constructor(private jobsRepository: JobRepository) {}

  async execute(companyId: string): Promise<IJobsResponse> {
    const jobs = await this.jobsRepository.getAllJobsByCompanyId(companyId);

    return {
      status: 200,
      data: {
        message: 'Logged company jobs listed successfully.',
        content: jobs || [],
      },
    };
  }
}
