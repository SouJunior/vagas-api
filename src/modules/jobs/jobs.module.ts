import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from './jobs.controller';
import { JobRepository } from './repository/job.resository';
import {
  CreateJobService,
  DeleteJobService,
  GetAllJobsService,
  GetOneJobByIdService,
  UpdateJobService,
} from './services';

@Module({
  imports: [TypeOrmModule.forFeature([JobRepository])],
  controllers: [JobsController],
  providers: [
    CreateJobService,
    GetAllJobsService,
    GetOneJobByIdService,
    UpdateJobService,
    DeleteJobService,
  ],
})
export class JobsModule {}
