import { Module } from '@nestjs/common';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import passport, { Passport } from 'passport';
import { MailModule } from '../mails/mail.module';
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
  imports: [MailModule,TypeOrmModule.forFeature([JobRepository]), PassportModule.register({defaultStrategy: 'jwt'})],
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
