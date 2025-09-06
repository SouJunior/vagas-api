import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repository/company.repository';

@Injectable()
export class DeleteCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string): Promise<{ data: object; status: number }> {
    const data = await this.companyRepository.deleteCompanyById(id);
    return {
      data,
      status: 200,
    };
  }
}
