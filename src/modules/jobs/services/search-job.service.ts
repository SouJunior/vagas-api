import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobsEntity } from '../../../database/entities/jobs.entity';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '../../../shared/pagination';
import { GetAllJobsDto } from '../dtos/get-all-jobs.dto';
import { JobRepository } from '../repository/job.repository';

@Injectable()
export class SearchJobsService {
  constructor(
    @InjectRepository(JobRepository)
    private readonly jobRepository: JobRepository,
  ) {}

  async execute(
    searchQuery: string,
    pageOptionsDto: PageOptionsDto,
    params: GetAllJobsDto,
  ): Promise<PageDto<JobsEntity>> {
    const { itemCount, entities } = await this.jobRepository.searchJobs(
      searchQuery,
      pageOptionsDto,
      params,
    );

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
