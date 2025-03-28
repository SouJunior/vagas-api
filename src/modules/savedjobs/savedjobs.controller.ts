import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SavedJobsService } from '../savedjobs/services/savedjobs.service';
import { SavedJobsEntity } from '../../database/entities/savedjobs.entity';
import { CreateSavedJobDto } from '../savedjobs/dtos/create-savedJob-dto';

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
