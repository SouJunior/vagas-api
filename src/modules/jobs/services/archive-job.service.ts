import { BadRequestException, Injectable } from '@nestjs/common';
import { JobRepository } from '../repository/job.repository';
import { IResponse } from '../interfaces/interfaces';

@Injectable()

export class ArchiveJobService {
  constructor(private jobRepository: JobRepository) {}

  async execute(id: string, companyId: string): Promise<IResponse> {
    const jobExists = await this.jobRepository.findOne(id, { where: { company_id: companyId } })
    
    if (!jobExists) {
      throw new BadRequestException('Job not found');
    }

    jobExists.status = "ARCHIVED"

    await this.jobRepository.save(jobExists)

    return { message: "Job archived successfully"}
  }
}
