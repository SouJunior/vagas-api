import { EntityRepository, Repository } from 'typeorm';
import { CurriculumEntity } from '../../../database/entities/curriculum.entity';
import { handleError } from '../../../shared/utils/handle-error.util';
import { CreateCurriculumType } from '../types/create-curriculum.type';

@EntityRepository(CurriculumEntity)
export class CurriculumRepository extends Repository<CurriculumEntity> {
  async saveCurriculum(data: CreateCurriculumType): Promise<CurriculumEntity> {
    return this.save(data).catch(handleError);
  }

  async findAllCurriculum(id: string): Promise<CurriculumEntity[]> {
    return this.find({ where: { user_id: id } }).catch(handleError);
  }

  async deleteByKey(key: string): Promise<void> {
    await this.softDelete({ fileKey: key }).catch(handleError);
  }
}
