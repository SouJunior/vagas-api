import { BadRequestException, Injectable } from '@nestjs/common';
import { JobRepository } from '../repository/job.repository';

@Injectable()
export class GetOneJobByIdService {
  constructor(private jobRepository: JobRepository) {}

  async execute(id: string) {
    if (!id) {
      throw new BadRequestException('Id not provider');
    }

    const jobExists = await this.jobRepository.findOneById(id);

    if (!jobExists) {
      throw new BadRequestException('Job not found');
    }

    return jobExists;
  }
}
