import { EntityRepository, Repository } from 'typeorm';
import { ApplicationEntity } from '../../../database/entities/applications.entity';

@EntityRepository(ApplicationEntity)
export class ApplicationsRepository extends Repository<ApplicationEntity> {
  async saveApplication(data: any): Promise<ApplicationEntity> {
    return this.save(data);
  }
}
