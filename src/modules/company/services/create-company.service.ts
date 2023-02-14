import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { CompanyRepository } from '../repository/company-repository';

@Injectable()
export class CreateCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(data: CreateCompanyDto) {
    return this.companyRepository.createCompany(data);
  }
}
