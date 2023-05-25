import { Module } from '@nestjs/common';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import passport, { Passport } from 'passport';
import { MailModule } from '../mails/mail.module';
import { JobsController } from './jobs.controller';
import { JobRepository } from './repository/job.repository';
import {
  CreateJobService,
  DeleteJobService,
  GetAllJobsService,
  GetOneJobByIdService,
  UpdateJobService,
} from './services';
import { SearchJobsService } from './services/search-job.service';
import { CompanyRepository } from '../company/repository/company-repository';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    MailModule,
    CompanyModule,
    TypeOrmModule.forFeature([JobRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [JobsController],
  providers: [
    CreateJobService,
    GetAllJobsService,
    GetOneJobByIdService,
    UpdateJobService,
    DeleteJobService,
    SearchJobsService,
    CompanyRepository,
  ],
})
export class JobsModule {}
