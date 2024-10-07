import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CandidacyEntity } from '../../../database/entities/candidacy.entity'; // Certifique-se de importar a entidade correta
import { InjectRepository } from '@nestjs/typeorm';
import { CandidacyStatus } from 'src/database/entities/candidacy-status.enum';

@Injectable()
export class CandidacyRepository {
  constructor(
    @InjectRepository(CandidacyEntity)
    private candidacyRepository: Repository<CandidacyEntity>,
  ) {}

  async create(candidacy: CandidacyEntity): Promise<CandidacyEntity> {
    return this.candidacyRepository.save(candidacy);
  }

  async updateStatus(id: string, status: CandidacyStatus): Promise<CandidacyEntity | undefined> {
    try {
      const candidacies = await this.candidacyRepository.find({ where: { id } });
  
      if (candidacies.length === 0) {
        return undefined;
      }
  
      const candidacyToUpdate = candidacies[0];
      candidacyToUpdate.status = status;
  
      await this.candidacyRepository.save(candidacyToUpdate);
  
      return candidacyToUpdate;
    } catch (error) {
      return undefined;
    }
  }
  
  
}
