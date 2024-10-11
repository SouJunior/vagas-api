import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CandidacyEntity } from '../../../database/entities/candidacy.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CandidacyRepository {
  constructor(
    @InjectRepository(CandidacyEntity)
    private candidacyRepository: Repository<CandidacyEntity>,
  ) {}

  async createCandidacy(candidacy: CandidacyEntity): Promise<CandidacyEntity> {
    return this.candidacyRepository.save(candidacy);
  }

  async findAllByUserId(userId: string): Promise<CandidacyEntity[]> {
    return this.candidacyRepository.find({ where: { user: { id: userId } } });
  }

  async updateStatus(id: string, status: string): Promise<CandidacyEntity | undefined> {
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