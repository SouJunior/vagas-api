import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CompanyRepository } from '../repository/company-repository';

@Injectable()
export class ActivateCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string) {
    if (!id) {
      throw new BadRequestException('Id not provided');
    }

    const companyExists = await this.companyRepository.findOneById(id);

    if (!companyExists) {
      throw new NotFoundException('company not found');
    }

    const company = await this.companyRepository.activateCompany(id);

    delete company.password;
    delete company.recoverPasswordToken;

    return company;
  }
}
