import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repository/company.repository';

@Injectable()
export class DeleteCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string): Promise<object> {
    return this.companyRepository.deleteCompanyById(id);
  }
}
