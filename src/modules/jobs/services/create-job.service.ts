import { Injectable } from '@nestjs/common';
import { CreateJobDto } from '../dtos/create-job.dto';
import { JobRepository } from '../repository/job.resository';

@Injectable()
export class CreateJobService {
  constructor(private readonly jobRepository: JobRepository) {}

  async execute(data: CreateJobDto) {
    const response = await this.jobRepository.createJob(data);

    return response;
  }
}
