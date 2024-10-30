import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CandidacyRepository } from 'src/modules/candidacy/repository/candidacy.repository';
import { CandidacyEntity } from '../../database/entities/candidacy.entity';
import { CandidacyStatus } from '../../database/entities/candidancy-status.enum';
import { CreateCandidacyDto } from './dto/create-candidacy.dto';

@Injectable()
export class CandidacyService {
  constructor(private readonly candidacyRepository: CandidacyRepository) {}

  async create(
    createCandidacyDto: CreateCandidacyDto,
  ): Promise<CandidacyEntity> {
    if (!createCandidacyDto.userId || !createCandidacyDto.jobId) {
      throw new BadRequestException('userId e jobId são obrigatórios');
    }

    const candidacy = new CandidacyEntity();
    candidacy.userId = createCandidacyDto.userId;
    candidacy.jobId = createCandidacyDto.jobId;
    candidacy.status = CandidacyStatus.InProgress;

    try {
      return await this.candidacyRepository.createCandidacy(candidacy);
    } catch (error) {
      throw new BadRequestException(
        'Erro ao criar a candidatura: ' + error.message,
      );
    }
  }

  async getCandidacyByUserId(userId: string): Promise<CandidacyEntity[]> {
    if (!userId) {
      throw new BadRequestException('userId é obrigatório');
    }

    try {
      const candidacy = await this.candidacyRepository.findAllByUserId(userId);
      if (!candidacy.length) {
        throw new NotFoundException(
          'Nenhuma candidatura encontrada para este usuário',
        );
      }
      return candidacy;
    } catch (error) {
      throw new BadRequestException(
        'Erro ao buscar candidaturas: ' + error.message,
      );
    }
  }

  async closeCandidacy(
    id: string,
    status: CandidacyStatus.Closed | CandidacyStatus.NoInterest,
  ): Promise<CandidacyEntity> {
    if (!id) {
      throw new BadRequestException('ID é obrigatório');
    }

    if (!Object.values(CandidacyStatus).includes(status)) {
      throw new BadRequestException('Status inválido');
    }

    try {
      const candidacy = await this.candidacyRepository.updateStatus(id, status);
      if (!candidacy) {
        throw new NotFoundException('Candidatura não encontrada');
      }
      return candidacy;
    } catch (error) {
      throw new BadRequestException(
        'Erro ao encerrar a candidatura: ' + error.message,
      );
    }
  }
}
