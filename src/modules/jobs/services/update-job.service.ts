import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateJobDto } from '../dtos/update-job.dto';
import { JobRepository } from '../repository/job.resository';

@Injectable()
export class UpdateJobService {
  constructor(private jobRepository: JobRepository) {}

  async execute(id: number, data: UpdateJobDto) {
    if (!id) {
      throw new BadRequestException('Id not provided');
    }

    const jobExists = await this.jobRepository.findOneById(id);

    if (!jobExists) {
      throw new BadRequestException('Job not found');
    }

    return this.jobRepository.updateJob(id, data);
  }
}
