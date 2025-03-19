import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CommentModule } from './modules/comment/comment.module';
import { CompanyModule } from './modules/company/company.module';
import { CurriculumModule } from './modules/curriculum/curriculum.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { MailModule } from './modules/mails/mail.module';
import { ReportsModule } from './modules/reports/reports.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { typeormConfig } from './database/data-source';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from './modules/user/repository/user.repository';
import { UsersEntity } from './database/entities/users.entity';
import { AlertsModule } from './modules/alert/alerts.module';
import { CandidacyModule } from './modules/candidacy/candidacy.module';
import { SavedJobsModule } from './modules/saved-jobs/saved-jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...typeormConfig,
        autoLoadEntities: true,
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JobsModule,
    UserModule,
    AuthModule,
    MailModule,
    ReportsModule,
    CompanyModule,
    CommentModule,
    UploadModule,
    CurriculumModule,
    ApplicationsModule,
    TypeOrmModule.forFeature([UsersEntity]),
    AlertsModule,
    CandidacyModule,
    SavedJobsModule,
    SavedJobsModule
  ],
  controllers: [AppController],
  providers: [AppService, UserRepository],
})
export class AppModule {}
