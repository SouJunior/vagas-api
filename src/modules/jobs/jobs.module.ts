import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from './jobs.controller';
import { JobRepository } from './repository/job.resository';
import { CreateJobService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([JobRepository])],
  controllers: [JobsController],
  providers: [CreateJobService],
})
export class JobsModule {}
