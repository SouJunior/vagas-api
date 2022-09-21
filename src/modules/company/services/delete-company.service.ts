import { BadRequestException, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repository/company-repository';

@Injectable()
export class DeleteCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: number) {
    const companyExists = await this.companyRepository.findCompanyById(id);

    if (!companyExists) {
      throw new BadRequestException('Company not found');
    }

    return this.companyRepository.deleteCompanyById(id);
  }
}
