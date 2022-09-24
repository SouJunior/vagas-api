import { Injectable } from '@nestjs/common';
import { PageDto, PageOptionsDto } from 'src/shared/pagination';
import { CreateJobDto } from '../dtos/create-job.dto';
import { JobRepository } from '../repository/job.resository';

@Injectable()
export class GetAllJobsService {
  constructor(private jobRepository: JobRepository) {}

  async execute(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CreateJobDto>> {
    const query = await this.jobRepository.getAllJobs(pageOptionsDto);

    return query;
  }
}
