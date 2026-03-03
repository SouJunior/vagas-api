import { Repository } from 'typeorm';
import { JobsEntity } from '../../../database/entities/jobs.entity';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '../../../shared/pagination';
import { handleError } from '../../../shared/utils/handle-error.util';
import { CreateJobDto } from '../dtos/create-job.dto';
import { GetAllJobsDto } from '../dtos/get-all-jobs.dto';
import { UpdateJobDto } from '../dtos/update-job.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJobDraftDto } from '../dtos/create-job-draft.dto';
import { JobStatus } from '../enums/job-status.enum';
import { CompleteJobDto } from '../dtos/complete-job.dto';

@Injectable()
export class JobRepository {
  constructor(
    @InjectRepository(JobsEntity)
    private jobsRepository: Repository<JobsEntity>,
  ) {}

  async createNewJob(data: CreateJobDto): Promise<void> {
    await this.jobsRepository.save(data).catch(handleError);
    return;
  }

  async createJobDraft(data: CreateJobDraftDto): Promise<JobsEntity> {
    const draft = this.jobsRepository.create({
      ...data,
      jobStatus: JobStatus.DRAFT,
      prerequisites: data.interestArea,
    });
    return this.jobsRepository.save(draft).catch(handleError);
  }

  async publishJob(
    jobId: string,
    completeData: CompleteJobDto,
  ): Promise<JobsEntity> {
    await this.jobsRepository
      .update(jobId, {
        description: completeData.description,
        prerequisites: completeData.requirements.join(', '),
        benefits: completeData.benefits?.join(', '),
        typeContract: completeData.contractType,
        contractType: completeData.journey,
        contractText: completeData.selectionProcess.join(' -> '),
        content: completeData.additionalInfo,
        jobStatus: JobStatus.PUBLISHED,
        publishedAt: new Date(),
      })
      .catch(handleError);

    return this.jobsRepository.findOneBy({ id: jobId }).catch(handleError);
  }

  async cancelJob(jobId: string): Promise<JobsEntity> {
    await this.jobsRepository
      .update(jobId, {
        jobStatus: JobStatus.CANCELED,
        canceledAt: new Date(),
      })
      .catch(handleError);

    return this.jobsRepository.findOneBy({ id: jobId }).catch(handleError);
  }

  async deleteJobDraft(jobId: string): Promise<void> {
    await this.jobsRepository.delete(jobId).catch(handleError);
  }

  async getAllJobsByCompanyId(companyId: string): Promise<JobsEntity[]> {
    const jobs = await this.jobsRepository.find({
      where: { company_id: companyId },
    });

    return jobs;
  }

  async getAllJobs(
    pageOptionsDto: PageOptionsDto,
    params: GetAllJobsDto,
  ): Promise<PageDto<JobsEntity>> {
    const queryBuilder = this.jobsRepository.createQueryBuilder('jobs');

    queryBuilder
      .leftJoin('jobs.company', 'company')
      .select(['jobs', 'company.id', 'company.companyName', 'company.profile'])
      .andWhere(params.modality ? 'jobs.modality = :modality' : {}, {
        modality: params.modality,
      })
      .andWhere('jobs.jobStatus = :status', { status: JobStatus.PUBLISHED })
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
    const queryBuilder = this.jobsRepository
      .createQueryBuilder('jobs')
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
        'company.profile',
        'applications.id',
        'users.id',
        'users.name',
        'users.email',
        'curriculum.id',
        'curriculum.file',
      ])
      .where('jobs.id = :id', { id });

    return queryBuilder.getOne().catch(handleError);
  }

  async updateJob(id: string, data: UpdateJobDto) {
    const job = await this.jobsRepository.findOneBy({ id }).catch(handleError);

    return this.jobsRepository
      .save({
        ...job,
        ...data,
      })
      .catch(handleError);
  }

  async searchJobs(
    searchQuery: string,
    pageOptionsDto: PageOptionsDto,
    params: GetAllJobsDto,
  ): Promise<{ itemCount: number; entities: JobsEntity[] }> {
    const queryBuilder = this.jobsRepository.createQueryBuilder('job');

    queryBuilder
      .leftJoin('job.company', 'company')
      .select(['job', 'company.id', 'company.companyName', 'company.profile'])
      .andWhere(`job.title ILIKE '%${searchQuery}%'`)
      .andWhere(`job.jobStatus = :status`, { status: JobStatus.PUBLISHED })
      .orderBy(`job.${pageOptionsDto.orderByColumn}`, pageOptionsDto.order)
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take)
      .take(pageOptionsDto.take);

    if (params.city) {
      queryBuilder.andWhere('job.city = :city', { city: params.city });
    }

    if (params.federalUnit) {
      queryBuilder.andWhere('job.federalUnit = :federalUnit', {
        federalUnit: params.federalUnit,
      });
    }

    if (params.modality) {
      queryBuilder.andWhere('job.modality = :modality', {
        modality: params.modality,
      });
    }

    const itemCount = await queryBuilder.getCount().catch(handleError);
    const { entities } = await queryBuilder
      .getRawAndEntities()
      .catch(handleError);

    return { itemCount, entities };
  }
}
