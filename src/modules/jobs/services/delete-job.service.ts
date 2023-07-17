import { Injectable } from '@nestjs/common';
import { JobsEntity } from '../../../database/entities/jobs.entity';
import { StatusEnum } from '../../../shared/enums/status.enum';
import { JobRepository } from '../repository/job.repository';

@Injectable()
export class DeleteJobService {
  constructor(private jobRepository: JobRepository) {}

  async execute(job: JobsEntity) {
    job.status = StatusEnum.ARCHIVED;
    return this.jobRepository.save(job);
  }
}
