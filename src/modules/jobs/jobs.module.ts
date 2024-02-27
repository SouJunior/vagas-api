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
import { GetAllJobsFromLoggedCompanyService } from './services/get-all-jobs-from-logged-company.service';
import { JobsEntity } from 'src/database/entities/jobs.entity';
import { CompaniesEntity } from 'src/database/entities/companies.entity';

@Module({
  imports: [
    MailModule,
    CompanyModule,
    TypeOrmModule.forFeature([JobRepository, JobsEntity, CompaniesEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [JobsController],
  providers: [
    CreateJobService,
    GetAllJobsService,
    GetAllJobsFromLoggedCompanyService,
    GetOneJobByIdService,
    UpdateJobService,
    ArchiveJobService,
    SearchJobsService,
    JobRepository,
    CompanyRepository
  ],
})
export class JobsModule {}
