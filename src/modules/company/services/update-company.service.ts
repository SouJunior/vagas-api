import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateCompanyDto } from '../dtos/update-company.sto';
import { CompanyRepository } from '../repository/company-repository';

@Injectable()
export class UpdateCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string, data: UpdateCompanyDto) {
    const companyExists = await this.companyRepository.findCompanyById(id);

    if (!companyExists) {
      throw new BadRequestException('Company not found');
    }

    return this.companyRepository.UpdateCompanyById(id, data);
  }
}
