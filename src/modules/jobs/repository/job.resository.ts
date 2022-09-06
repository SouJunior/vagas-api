import { JobEntity } from 'src/database/entities/jobs.entities';
import { Repository } from 'typeorm';
import { CreateJobDto } from '../dtos/create-job.dto';

export class JobRepository extends Repository<JobEntity> {
  async createJob(data: CreateJobDto) {
    return this.create(data);
  }
}
