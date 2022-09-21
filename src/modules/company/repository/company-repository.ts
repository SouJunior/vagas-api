import { CompanyEntity } from '../../../database/entities/company.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCompanyDto } from '../dtos/create-company.dto';

@EntityRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {
  async createCompany(data: CreateCompanyDto): Promise<CompanyEntity> {
    return this.save(data);
  }

  async findAllCompany(): Promise<CompanyEntity[]> {
    return this.find();
  }

  async findCompanyById(id: number): Promise<CompanyEntity> {
    return this.findOne(id);
  }
}
