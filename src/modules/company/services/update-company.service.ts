import { Injectable } from '@nestjs/common';
import { CompaniesEntity } from '../../../database/entities/companies.entity';
import { UpdateCompanyDto } from '../dtos/update-company.sto';
import { CompanyRepository } from '../repository/company-repository';

@Injectable()
export class UpdateCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(company: CompaniesEntity, data: UpdateCompanyDto) {
    return this.companyRepository.UpdateCompanyById(company, data);
  }
}
