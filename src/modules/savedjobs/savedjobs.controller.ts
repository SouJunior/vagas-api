import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SavedJobsService } from '../savedjobs/services/savedjobs.service';
import { SavedJobsEntity } from '../../database/entities/savedjobs.entity';
import { CreateSavedJobDto } from '../savedjobs/dtos/create-savedJob-dto';
import { AuthGuard } from '@nestjs/passport';
import { SwaggerFindSavedJobs } from 'src/shared/Swagger/decorators/savedjobs/view-savedjobs.swagger.decorator';
import { SwaggerCreateSavedJobs } from 'src/shared/Swagger/decorators/savedjobs/create-savedjobs.swagger.decorator';
import { GetAllSavedJobsDto } from './dtos/get-all-savedjobs.dto';
import { PageOptionsDto } from 'src/shared/pagination';
import { FindAllSavedJobsService } from './services/find-all-savedjobs.service';

@ApiTags('saved-jobs')
@Controller('saved-jobs')
export class SavedJobsController {
  constructor(
    private readonly savedJobsService: SavedJobsService, 
    private readonly findAllSavedJobsService: FindAllSavedJobsService
  ) {}

  @Post()
  @ApiBearerAuth()
  @SwaggerCreateSavedJobs()
  @ApiOperation({ summary: 'Save a job for a user' })
  async saveJob(
    @Body() createSavedJobDto: CreateSavedJobDto,
  ): Promise<SavedJobsEntity> {
    return this.savedJobsService.saveJob(createSavedJobDto);
  }

  @Get()
  @SwaggerFindSavedJobs()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getAllSavedJobs(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() query: GetAllSavedJobsDto,
  ) {
    return this.findAllSavedJobsService.execute(pageOptionsDto, query);
  }
}
