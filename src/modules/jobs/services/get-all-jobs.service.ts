import { Injectable } from '@nestjs/common';
import { JobsEntity } from '../../../database/entities/jobs.entity';
import { PageDto, PageOptionsDto } from '../../../shared/pagination';
import { JobRepository } from '../repository/job.resository';

@Injectable()
export class GetAllJobsService {
  constructor(private jobRepository: JobRepository) {}

  async execute(pageOptionsDto: PageOptionsDto): Promise<PageDto<JobsEntity>> {
    const query = await this.jobRepository.getAllJobs(pageOptionsDto);

    return query;
  }
}
