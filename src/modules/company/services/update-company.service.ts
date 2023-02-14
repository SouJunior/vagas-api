import { Injectable } from '@nestjs/common';
import { CompanyEntity } from 'src/database/entities/company.entity';
import { UpdateCompanyDto } from '../dtos/update-company.sto';
import { CompanyRepository } from '../repository/company-repository';

@Injectable()
export class UpdateCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(company: CompanyEntity, data: UpdateCompanyDto) {
    return this.companyRepository.UpdateCompanyById(company, data);
  }
}
