import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repository/company-repository';

@Injectable()
export class FindAllCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute() {
    const companies = await this.companyRepository.findAllCompany();

    if (companies.length <= 0) {
      return { message: 'Companies is empty' };
    }

    return companies;
  }
}
