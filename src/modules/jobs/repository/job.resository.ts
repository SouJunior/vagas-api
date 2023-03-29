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

@EntityRepository(JobsEntity)
export class JobRepository extends Repository<JobsEntity> {
  async createNewJob(data: CreateJobDto): Promise<void> {
    await this.save(data).catch(handleError);
    return;
  }

  async getAllJobs(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<JobsEntity>> {
    const queryBuilder = this.createQueryBuilder('jobs');

    queryBuilder
      .orderBy(`jobs.${pageOptionsDto.orderByColumn}`, pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount().catch(handleError);
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOneById(id: string): Promise<any> {
    return this.findOne({
      relations: ['comments', 'comments.user', 'company'],
      where: { id },
    }).catch(handleError);
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
}
