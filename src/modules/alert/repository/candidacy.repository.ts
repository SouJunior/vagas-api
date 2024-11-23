import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CandidacyEntity } from '../../../database/entities/candidacy.entity';
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
      const candidacyToUpdate = await this.candidacyRepository.findOne({ where: { id } });  
      if (!candidacyToUpdate) {
        return undefined;
      }
  
      await this.candidacyRepository.save(candidacyToUpdate);
  
      return candidacyToUpdate;
    } catch (error) {
      return undefined;
    }
  }
  
  async findByUserId(userId: string): Promise<CandidacyEntity[]> { 
    return await this.candidacyRepository.find({ where: { userId } }); 
  }

}