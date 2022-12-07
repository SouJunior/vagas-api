import { Injectable, BadRequestException } from '@nestjs/common';
import { CompanyRepository } from '../repository/company-repository';

@Injectable()
export class FindCompanyById {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string) {
    const companyExists = await this.companyRepository.findCompanyById(id);

    if (!companyExists) {
      throw new BadRequestException('Company not found');
    }

    return companyExists;
  }
}
