import { Injectable } from '@nestjs/common';
import { JobsEntity } from '../../../database/entities/jobs.entity';
import { PageDto, PageOptionsDto } from '../../../shared/pagination';
import { JobRepository } from '../repository/job.repository';
import { GetAllJobsDto } from '../dtos/get-all-jobs.dto';

@Injectable()
export class GetAllJobsService {
  constructor(private jobRepository: JobRepository) {}

  async execute(
    pageOptionsDto: PageOptionsDto,
    params: GetAllJobsDto,
  ): Promise<PageDto<JobsEntity>> {
    const query = await this.jobRepository.getAllJobs(pageOptionsDto, params);

    return query;
  }
}
