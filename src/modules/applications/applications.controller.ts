import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersEntity } from '../../database/entities/users.entity';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { ApplicationsService } from './applications.service';

@ApiTags('Applications')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Get()
  async saveApplication(
    @Query() jobId: string,
    @Query() curriculumId: string,
    @LoggedUser() user: UsersEntity,
  ) {
    return this.applicationsService.saveApplication(user, jobId, curriculumId);
  }
}
