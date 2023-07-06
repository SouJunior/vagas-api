import { EntityRepository, Repository } from 'typeorm';
import { JobsEntity } from '../../../database/entities/jobs.entity';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '../../../shared/pagination';
import { handleError } from '../../../shared/utils/handle-error.util';
import { CreateJobDto } from '../dtos/create-job.dto';
import { UpdateJobDto } from '../dtos/update-job.dto';
import { GetAllJobsDto } from '../dtos/get-all-jobs.dto';

@EntityRepository(JobsEntity)
export class JobRepository extends Repository<JobsEntity> {
  async createNewJob(data: CreateJobDto): Promise<void> {
    await this.save(data).catch(handleError);
    return;
  }

  async getAllJobs(
    pageOptionsDto: PageOptionsDto,
    params: GetAllJobsDto,
  ): Promise<PageDto<JobsEntity>> {
    const queryBuilder = this.createQueryBuilder('jobs');

    queryBuilder
      .andWhere(params.modality ? 'jobs.modality = :modality' : {}, {
        modality: params.modality,
      })
      .orderBy(`jobs.${pageOptionsDto.orderByColumn}`, pageOptionsDto.order)
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take)
      .take(pageOptionsDto.take);

    if (params.city) {
      queryBuilder.andWhere('jobs.city = :city', { city: params.city });
    }

    if (params.federalUnit) {
      queryBuilder.andWhere('jobs.federalUnit = :federalUnit', {
        federalUnit: params.federalUnit,
      });
    }

    const itemCount = await queryBuilder.getCount().catch(handleError);
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOneById(id: string): Promise<any> {
    const queryBuilder = this.createQueryBuilder('jobs')
      .leftJoinAndSelect('jobs.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'user')
      .leftJoinAndSelect('jobs.company', 'company')
      .leftJoinAndSelect('jobs.applications', 'applications')
      .leftJoinAndSelect('applications.user', 'users')
      .leftJoinAndSelect('applications.curriculum', 'curriculum')
      .select([
        'jobs',
        'comments.id',
        'user.id',
        'company.id',
        'company.companyName',
        'applications.id',
        'users.id',
        'users.name',
        'users.email',
        'curriculum.id',
        'curriculum.file',
      ])
      .where('jobs.id = :id', { id });

    return queryBuilder.getOne();
  }

  async updateJob(id: string, data: UpdateJobDto) {
    const job = await this.findOne(id).catch(handleError);

    return this.save({
      ...job,
      ...data,
    }).catch(handleError);
  }

  async deleteJobById(id: string): Promise<object> {
    await this.delete(id).catch(handleError);

    return { message: 'Job deleted successfully' };
  }

  async searchJobs(
    searchQuery: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<{ itemCount: number; entities: JobsEntity[] }> {
    const queryBuilder = this.createQueryBuilder('job');

    queryBuilder
      .andWhere(`job.title ILIKE '%${searchQuery}%'`)
      .orderBy(`job.${pageOptionsDto.orderByColumn}`, pageOptionsDto.order)
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    return { itemCount, entities };
  }
}
