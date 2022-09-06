import { Body, Controller, Post } from '@nestjs/common';
import { CreateJobDto } from './dtos/create-job.dto';
import { CreateJobService } from './services';

@Controller('job')
export class JobsController {
  constructor(private createJobService: CreateJobService) {}

  @Post()
  async createNewJob(@Body() data: CreateJobDto) {
    return this.createJobService.execute(data);
  }
}
