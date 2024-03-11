import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRepository } from '../jobs/repository/job.repository';
import { UserRepository } from '../user/repository/user.repository';
import { ReportsController } from './reports.controller';
import { ReportRepository } from './repository/reports.repository';
import {
  CreateReportService,
  DeleteReportService,
  FindAllReportsService,
  FindReportByIdService,
  UpdateReportService,
} from './services';
import { ReportsEntity } from 'src/database/entities/reports.entity';
import { UsersEntity } from 'src/database/entities/users.entity';
import { JobsEntity } from 'src/database/entities/jobs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportsEntity, UsersEntity, JobsEntity]),
  ],
  controllers: [ReportsController],
  providers: [
    JobRepository,
    UserRepository,
    ReportRepository,
    CreateReportService,
    FindAllReportsService,
    FindReportByIdService,
    DeleteReportService,
    UpdateReportService,
  ],
})
export class ReportsModule {}
