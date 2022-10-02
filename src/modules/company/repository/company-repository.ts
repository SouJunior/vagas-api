import { CompanyEntity } from '../../../database/entities/company.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { UpdateCompanyDto } from '../dtos/update-company.sto';
import { PageOptionsDto, PageDto, PageMetaDto } from 'src/shared/pagination';

@EntityRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {
  async createCompany(data: CreateCompanyDto): Promise<CompanyEntity> {
    return this.save(data);
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

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findCompanyById(id: number): Promise<CompanyEntity> {
    return this.findOne(id);
  }

  async UpdateCompanyById(id: number, data: UpdateCompanyDto) {
    const company = await this.findOne(id);

    return this.save({
      ...company,
      ...data,
    });
  }

  async deleteCompanyById(id: number): Promise<object> {
    this.delete(id);

    return { message: 'Company deleted successfully' };
  }
}
