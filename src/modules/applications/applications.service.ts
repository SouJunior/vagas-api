import { Injectable } from '@nestjs/common';
import { CurriculumEntity } from '../../database/entities/curriculum.entity';
import { JobsEntity } from '../../database/entities/jobs.entity';
import { UsersEntity } from '../../database/entities/users.entity';
import { ApplicationsRepository } from './repository/applications.repository';

@Injectable()
export class ApplicationsService {
  constructor(private applicationsRepository: ApplicationsRepository) {}

  async saveApplication(
    user: UsersEntity,
    job: JobsEntity,
    curriculum: CurriculumEntity,
  ) {
    const newApplication = {
      job,
      user,
      curriculum,
    };

    return this.applicationsRepository.saveApplication(newApplication);
  }
}
