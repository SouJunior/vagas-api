import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobsEntity } from '../../../database/entities/jobs.entity';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '../../../shared/pagination';
import { JobRepository } from '../repository/job.resository';

@Injectable()
export class SearchJobsService {
  constructor(
    @InjectRepository(JobRepository)
    private readonly jobRepository: JobRepository,
  ) {}

  async execute(
    searchQuery: string,
    company_id: string,
    headquarters: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<JobsEntity>> {
    const queryBuilder = this.jobRepository.createQueryBuilder('job');

    if (company_id) {
      queryBuilder
        .innerJoin('job.company', 'company')
        .andWhere(`company.id = :companyId`, { companyId: company_id });
    }

    if (headquarters) {
      queryBuilder.andWhere(`job.headquarters ILIKE '%${headquarters}%'`);
    }

    queryBuilder
      .andWhere(`job.title ILIKE '%${searchQuery}%'`)
      .orderBy(`job.${pageOptionsDto.orderByColumn}`, pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
