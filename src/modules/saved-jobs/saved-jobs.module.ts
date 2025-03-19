import { Module } from '@nestjs/common';
import { SavedJobsService } from './services/saved-jobs.service';
import { SavedJobsController } from './controllers/saved-jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedJobEntity } from 'src/database/entities/saved-job.entity';
import { SavedJobsRepository } from './repository/saved-jobs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SavedJobEntity])],
  controllers: [SavedJobsController],
  providers: [SavedJobsService, SavedJobsRepository],
  exports: [SavedJobsService]
})
export class SavedJobsModule {}
