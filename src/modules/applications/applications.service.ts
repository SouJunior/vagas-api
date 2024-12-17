import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../../database/entities/users.entity';
import { ApplicationsRepository } from './repository/applications.repository';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly applicationsRepository: ApplicationsRepository,
  ) {}

  async saveApplication(
    user: UsersEntity,
    jobId: string,
    curriculumId: string,
  ) {
    const newApplication = {
      job_id: jobId,
      user_id: user.id,
      curriculum_id: curriculumId,
    };

    return this.applicationsRepository.saveApplication(newApplication);
  }
}
