import { BadRequestException, Injectable } from '@nestjs/common';
import { CompaniesEntity } from '../../../database/entities/companies.entity';
import { CreateJobDraftDto } from '../dtos/create-job-draft.dto';
import { JobRepository } from '../repository/job.repository';

@Injectable()
export class CreateJobDraftService {
  constructor(private jobRepository: JobRepository) {}

  async execute(data: CreateJobDraftDto, company: CompaniesEntity) {
    const { salaryMin, salaryMax } = data;

    if (salaryMin > salaryMax) {
      throw new BadRequestException(
        'Salary minimum cannot be greater than salary maximum',
      );
    }

    data.company_id = company.id;

    const draft = await this.jobRepository.createJobDraft(data);

    return {
      id: draft.id,
      status: draft.jobStatus,
      message: 'Draft created successfully',
    };
  }
}
