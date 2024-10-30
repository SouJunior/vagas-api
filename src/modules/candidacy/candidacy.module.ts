import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CandidacyService } from './candidacy.service';
import { CandidacyEntity } from 'src/database/entities/candidacy.entity';
import { CandidacyRepository } from './repository/candidacy.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CandidacyEntity])],
  controllers: [],
  providers: [CandidacyService, CandidacyRepository],
  exports: [CandidacyService],
})
export class CandidacyModule {}
