import { Injectable } from '@nestjs/common';
import { JobsEntity } from '../../../database/entities/jobs.entity';
import { StatusEnum } from '../../../shared/enums/status.enum';
import { JobRepository } from '../repository/job.repository';

@Injectable()
export class DeleteJobService {
  constructor(private jobRepository: JobRepository) {}

  async execute(job: JobsEntity, content: string) {
    job.status = StatusEnum.ARCHIVED;
    job.content = content;
    return this.jobRepository.save(job);
  }
}
