import { Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '../repository/company.repository';

@Injectable()
export class ActivateCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string) {
    const companyExists = await this.companyRepository.findOneById(id);

    if (!companyExists) {
      throw new NotFoundException('company not found');
    }

    await this.companyRepository.activateCompany(id);

    return {
      status: 204,
      data: 'Company Activated',
    };
  }
}
