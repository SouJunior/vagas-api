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

  async updateStatus(id: string, status: CandidacyStatus): Promise<CandidacyEntity> {
    try {
      const candidacyToUpdate = await this.candidacyRepository.findOne({ where: { id } });
      
      if (!candidacyToUpdate) {
        console.log(`Candidatura com ID ${id} não encontrada.`);
        throw new Error(`Candidatura com ID ${id} não foi encontrada.`);
      }
  
      candidacyToUpdate.status = status;
      await this.candidacyRepository.save(candidacyToUpdate);
  
      return candidacyToUpdate;
    } catch (error) {
      console.error('Erro ao atualizar o status da candidatura:', error.message);
      throw new Error('Erro ao atualizar o status da candidatura.');
    }
  }
  
  
  async findByUserId(userId: string): Promise<CandidacyEntity[]> { 
    return await this.candidacyRepository.find({ where: { userId } }); 
  }

}