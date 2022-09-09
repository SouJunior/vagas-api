import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import {
  CreateJobService,
  DeleteJobService,
  GetAllJobsService,
  GetOneJobByIdService,
  UpdateJobService,
} from './services';

@Controller('job')
export class JobsController {
  constructor(
    private createJobService: CreateJobService,
    private getAllJobsService: GetAllJobsService,
    private getOneJobByIdService: GetOneJobByIdService,
    private updateJobService: UpdateJobService,
    private deleteJobService: DeleteJobService,
  ) {}

  @Post()
  async createNewJob(@Body() data: CreateJobDto) {
    return this.createJobService.execute(data);
  }

  @Get()
  async getAllJobs() {
    return this.getAllJobsService.execute();
  }

  @Get(':id')
  async getOneJob(@Param('id') id: string) {
    return this.getOneJobByIdService.execute(+id);
  }

  @Put(':id')
  async updateJob(@Param('id') id: string, @Body() data: UpdateJobDto) {
    return this.updateJobService.execute(+id, data);
  }

  @Delete(':id')
  async deleteJob(@Param('id') id: string) {
    return this.deleteJobService.execute(+id);
  }
}
