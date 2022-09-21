import { CompanyEntity } from '../../../database/entities/company.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { UpdateCompanyDto } from '../dtos/update-company.sto';

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

  async UpdateCompanyById(id: number, data: UpdateCompanyDto) {
    const company = await this.findOne(id);

    return this.save({
      ...company,
      ...data,
    });
  }

  async deleteCompanyById(id: number): Promise<object> {
    this.delete(id);

    return { message: 'Company deleted successfully' };
  }
}
