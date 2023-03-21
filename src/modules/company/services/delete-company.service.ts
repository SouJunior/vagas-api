import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repository/company-repository';

@Injectable()
export class DeleteCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string) {
    const companyExists = await this.companyRepository.findCompanyById(id);

    if (!companyExists) {
      return {
        status: 404,
        data: {
          message: 'Company not found',
        },
      };
    }

    await this.companyRepository.deleteCompanyById(id);

    return {
      status: 200,
      data: {
        message: 'Company deleted successfully',
      },
    };
  }
}
