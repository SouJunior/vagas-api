import { Injectable } from '@nestjs/common';
import { CompanyEntity } from '../../../database/entities/companies.entity';
import { PageDto, PageOptionsDto } from '../../../shared/pagination';

import { CompanyRepository } from '../repository/company-repository';

@Injectable()
export class FindAllCompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CompanyEntity>> {
    const query = await this.companyRepository.findAllCompany(pageOptionsDto);

    return query;
  }
}
