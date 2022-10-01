import { Injectable } from '@nestjs/common';
import { CompanyEntity } from 'src/database/entities/company.entity';
import { PageDto, PageOptionsDto } from 'src/shared/pagination';

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
