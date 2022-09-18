import { CompanyEntity } from 'src/database/entities/company.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {}
