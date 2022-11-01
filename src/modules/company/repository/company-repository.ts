import { CompanyEntity } from '../../../database/entities/company.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { UpdateCompanyDto } from '../dtos/update-company.sto';
import {
  PageOptionsDto,
  PageDto,
  PageMetaDto,
} from '../../../shared/pagination';
import { handleError } from '../../../shared/utils/handle-error.util';

@EntityRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {
  async createCompany(data: CreateCompanyDto): Promise<CompanyEntity> {
    return this.save(data).catch(handleError);
  }

  async findAllCompany(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CompanyEntity>> {
    const queryBuilder = this.createQueryBuilder('companies');

    queryBuilder
      .orderBy(
        `companies.${pageOptionsDto.orderByColumn}`,
        pageOptionsDto.order,
      )
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount().catch(handleError);
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findCompanyById(id: number): Promise<CompanyEntity> {
    return this.findOne(id).catch(handleError);
  }

  async UpdateCompanyById(id: number, data: UpdateCompanyDto) {
    const company = await this.findOne(id).catch(handleError);

    return this.save({
      ...company,
      ...data,
    }).catch(handleError);
  }

  async deleteCompanyById(id: number): Promise<object> {
    this.delete(id).catch(handleError);

    return { message: 'Company deleted successfully' };
  }
}
