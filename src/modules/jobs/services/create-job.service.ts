import { Injectable } from '@nestjs/common';
import { CreateJobDto } from '../dtos/create-job.dto';
import { JobRepository } from '../repository/job.resository';

@Injectable()
export class CreateJobService {
  constructor(private jobRepository: JobRepository) {}

  async execute(data: CreateJobDto) {
    const response = await this.jobRepository.createNewJob(data);

    return response;
  }
}
