import { Injectable } from '@nestjs/common';
import { CompaniesEntity } from '../../../database/entities/companies.entity';
import { PageDto, PageOptionsDto } from '../../../shared/pagination';

import { CompanyRepository } from '../repository/company.repository';

@Injectable()
export class FindAllCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CompaniesEntity>> {
    const query = await this.companyRepository.findAllCompany(pageOptionsDto);

    return query;
  }
}
