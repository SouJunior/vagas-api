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

const {
  ISLOCAL,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_PASSWORD,
  TYPEORM_USERNAME,
  TYPEORM_DATABASE,
  TYPEORM_DOCKER_HOST,
  TYPEORM_DOCKER_PORT,
  TYPEORM_DOCKER_USERNAME,
  TYPEORM_DOCKER_PASSWORD,
  TYPEORM_DOCKER_DATABASE,
} = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ISLOCAL == 'true' ? TYPEORM_DOCKER_HOST : TYPEORM_HOST,
      port: ISLOCAL == 'true' ? +TYPEORM_DOCKER_PORT : +TYPEORM_PORT,
      username: ISLOCAL == 'true' ? TYPEORM_DOCKER_USERNAME : TYPEORM_USERNAME,
      password: ISLOCAL == 'true' ? TYPEORM_DOCKER_PASSWORD : TYPEORM_PASSWORD,
      database: ISLOCAL == 'true' ? TYPEORM_DOCKER_DATABASE : TYPEORM_DATABASE,
      logging: true,
      migrationsRun: true,
      synchronize: true,
      entities: ['dist/database/entities/*.entity.js'],
      migrations: [
        'dist/database/migrations/*.js',
        'dist/database/migrations/seeds/*.js',
      ],
    }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
