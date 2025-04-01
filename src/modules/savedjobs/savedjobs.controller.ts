import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SavedJobsService } from '../savedjobs/services/savedjobs.service';
import { SavedJobsEntity } from '../../database/entities/savedjobs.entity';
import { CreateSavedJobDto } from '../savedjobs/dtos/create-savedJob-dto';
import { AuthGuard } from '@nestjs/passport';
import { SwaggerFindSavedJobs } from 'src/shared/Swagger/decorators/savedjobs/view-savedjobs.swagger.decorator';

@ApiTags('saved-jobs')
@Controller('saved-jobs')
export class SavedJobsController {
  constructor(private readonly savedJobsService: SavedJobsService) {}

  @Post()
  async saveJob(
    @Body() createSavedJobDto: CreateSavedJobDto,
  ): Promise<SavedJobsEntity> {
    return this.savedJobsService.saveJob(createSavedJobDto);
  }

  @Get()

  async getAllSavedJobs() {
    return this.savedJobsService.getAllSavedJobs();
  }
}
