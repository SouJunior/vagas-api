import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CandidacyEntity } from 'src/database/entities/candidacy.entity';
import { CandidacyRepository } from './repository/candidacy.repository';
import { CandidacyService } from './service/candidacy.service';
import { CandidacyController } from './controller/candidacy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CandidacyEntity])],
  controllers: [CandidacyController],
  providers: [CandidacyService, CandidacyRepository],
  exports: [CandidacyService],
})
export class CandidacyModule {}
