import { JobEntity } from 'src/database/entities/jobs.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateJobDto } from '../dtos/create-job.dto';
import { UpdateJobDto } from '../dtos/update-job.dto';

@EntityRepository(JobEntity)
export class JobRepository extends Repository<JobEntity> {
  async createNewJob(data: CreateJobDto): Promise<CreateJobDto> {
    return this.save(data);
  }

  async getAllJobs(): Promise<CreateJobDto[]> {
    return this.find();
  }

  async findOneById(id: number): Promise<CreateJobDto> {
    return this.findOne(id);
  }

  async updateJob(id: number, data: UpdateJobDto) {
    const job = await this.findOne(id);

    return this.save({
      ...job,
      ...data,
    });
  }

  async deleteJobById(id: number): Promise<object> {
    this.delete(id);

    return { message: 'Job deleted successfully' };
  }
}
