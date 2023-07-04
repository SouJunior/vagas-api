import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurriculumEntity } from '../../database/entities/curriculum.entity';
import { JobsEntity } from '../../database/entities/jobs.entity';
import { UsersEntity } from '../../database/entities/users.entity';
import GetEntity from '../../shared/pipes/pipe-entity.pipe';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { ApplicationsService } from './applications.service';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';

@ApiTags('Applications')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Get()
  async saveApplication(
    @Query('job_id', new GetEntity(JobsEntity))
    job: JobsEntity,
    @Query('curriculum_id', new GetEntity(CurriculumEntity))
    curriculum: CurriculumEntity,
    @LoggedUser() user: UsersEntity,
  ) {
    return this.applicationsService.saveApplication(user, job, curriculum);
  }
}
