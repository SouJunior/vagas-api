import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidacyRepository } from 'src/modules/candidacy/repository/candidacy.repository';
import { CreateCandidacyDto } from 'src/candidacy/dto/create-candidacy.dto';
import { CandidacyEntity } from '../database/entities/candidacy.entity';

@Injectable()
export class CandidacyService {
  constructor(
    @InjectRepository(CandidacyRepository)
    private readonly candidacyRepository: CandidacyRepository
  ) {}

  async create(createCandidacyDto: CreateCandidacyDto): Promise<CandidacyEntity> {
    const candidacy = new CandidacyEntity();
    candidacy.userId = createCandidacyDto.userId;
    candidacy.jobId = createCandidacyDto.jobId;
    candidacy.status = 'Em andamento';
    return this.candidacyRepository.createCandidacy(candidacy);
  }

  async getCandidacyByUserId(userId: string): Promise<CandidacyEntity[]> {
    return this.candidacyRepository.findAllByUserId(userId);
  }

  async closeCandidacy(id: string, status: 'Encerrada' | 'Sem interesse'): Promise<CandidacyEntity> {
    return this.candidacyRepository.updateStatus(id, status);
  }
}
