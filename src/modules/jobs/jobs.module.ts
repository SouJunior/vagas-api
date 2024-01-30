import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from '../company/company.module';
import { CompanyRepository } from '../company/repository/company-repository';
import { MailModule } from '../mails/mail.module';
import { JobsController } from './jobs.controller';
import { JobRepository } from './repository/job.repository';
import {
  CreateJobService,
  ArchiveJobService,
  GetAllJobsService,
  GetOneJobByIdService,
  UpdateJobService,
} from './services';
import { SearchJobsService } from './services/search-job.service';

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
    ArchiveJobService,
    SearchJobsService,
    CompanyRepository,
  ],
})
export class JobsModule {}
