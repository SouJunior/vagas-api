import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SavedJobsService } from './services/savedjobs.service';
import { FindAllSavedJobsService } from './services/find-all-savedjobs.service';
import { SavedJobsRepository } from './repository/savedjobs.repository';
import { SavedJobsCleanerService } from './services/savedjobs-cleaner.service';
import { DeleteSavedJobsService } from './services/delete-saved-jobs.service';
import { SavedJobsEntity } from 'src/database/entities/savedjobs.entity';
import { UsersEntity } from 'src/database/entities/users.entity';
import { JobsEntity } from 'src/database/entities/jobs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SavedJobsEntity, UsersEntity, JobsEntity]),
  ],
  providers: [
    SavedJobsService,
    FindAllSavedJobsService,
    SavedJobsRepository,
    SavedJobsCleanerService,
    DeleteSavedJobsService,
  ],
  exports: [
    SavedJobsService,
    FindAllSavedJobsService,
    SavedJobsRepository,
    SavedJobsCleanerService,
    DeleteSavedJobsService,
  ],
})
export class SavedJobsModule {}
