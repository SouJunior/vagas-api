import { Injectable } from '@nestjs/common';
import { JobsEntity } from '../../../database/entities/jobs.entity';
import { StatusEnum } from '../../../shared/enums/status.enum';
import { JobRepository } from '../repository/job.repository';
import { IJobsResponse } from '../interfaces/interfaces';

@Injectable()
export class DeleteJobService {
  constructor(private jobRepository: JobRepository) {}

  async execute(jobId: string, content: string) : Promise<IJobsResponse> {

    const jobExists = await this.jobRepository.findOneById(jobId)

    if (!jobExists) {
      return {
        status: 404,
        data: {
          message: "Job could not be found"
        }
      }
    }

    jobExists.status = StatusEnum.ARCHIVED;
    jobExists.content = content;
    
    await this.jobRepository.updateJob(jobId, jobExists);

    return {
      status: 200,
      data: {
        message: "Job archived successfully"
      }
    }
  }
}
