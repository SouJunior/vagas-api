import { Repository } from 'typeorm';
import { CurriculumEntity } from '../../../database/entities/curriculum.entity';
import { handleError } from '../../../shared/utils/handle-error.util';
import { CreateCurriculumType } from '../types/create-curriculum.type';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CurriculumRepository {
  constructor(
    @InjectRepository(CurriculumEntity)
    private curriculumRepository: Repository<CurriculumEntity>,
  ) {}

  async saveCurriculum(data: CreateCurriculumType): Promise<CurriculumEntity> {
    return this.curriculumRepository.save(data).catch(handleError);
  }

  async findOneByUserId(userId: string): Promise<CurriculumEntity> {
    return this.curriculumRepository
      .findOneBy({ user_id: userId })
      .catch(handleError);
  }

  async findAllCurriculum(id: string): Promise<CurriculumEntity[]> {
    return this.curriculumRepository
      .find({ select: { user_id: true } })
      .catch(handleError);
  }

  async deleteByKey(key: string): Promise<void> {
    await this.curriculumRepository
      .softDelete({ fileKey: key })
      .catch(handleError);
  }
}
