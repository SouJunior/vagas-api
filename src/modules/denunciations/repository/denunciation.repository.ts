import { DenunciationEntity } from 'src/database/entities/denunciation.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(DenunciationEntity)
export class UserRepository extends Repository<any> {
  async createDenunciation(data: any): Promise<DenunciationEntity> {
    return this.create(data);
  }
}
