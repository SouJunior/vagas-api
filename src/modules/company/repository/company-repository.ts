import { CompaniesEntity } from 'src/database/entities/companies.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/shared/pagination';
import { EntityRepository, Repository } from 'typeorm';
import { handleError } from '../../../shared/utils/handle-error.util';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { UpdateCompanyDto } from '../dtos/update-company.sto';
import { UpdateMyPasswordDto } from '../dtos/update-my-password.dto';

@EntityRepository(CompaniesEntity)
export class CompanyRepository extends Repository<CompaniesEntity> {
  async createCompany(data: CreateCompanyDto): Promise<CompaniesEntity> {
    return this.save(data).catch(handleError);
  }

  async findAllCompany(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CompaniesEntity>> {
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

  async findCompanyById(id: string): Promise<CompaniesEntity> {
    return this.findOne(id).catch(handleError);
  }

  async UpdateCompanyById(id: string, data: UpdateCompanyDto) {
    const company = await this.findOne(id).catch(handleError);

    return this.save({
      ...company,
      ...data,
    }).catch(handleError);
  }

  async findOneByEmail(email: string): Promise<CompaniesEntity> {
    return this.findOne({ where: { email } }).catch(handleError);
  }

  async findByToken(recoverPasswordToken: string): Promise<CompaniesEntity> {
    return this.findOne({ where: { recoverPasswordToken } }).catch(handleError);
  }

  async findOneById(id: string): Promise<CompaniesEntity> {
    return this.findOne(id).catch(handleError);
  }

  async findOneByCnpj(cnpj: string): Promise<CompaniesEntity> {
    return this.findOne({ cnpj }).catch(handleError);
  }

  async updateMyPassword(updateMyPasswordDto: UpdateMyPasswordDto, id) {
    const company = await this.findOne(id).catch(handleError);
    const data = { ...updateMyPasswordDto };

    return this.save({
      ...company,
      ...data,
    }).catch(handleError);
  }

  async updateRecoveryPassword(id, recoverPasswordToken) {
    const company = await this.findOne(id).catch(handleError);

    company.recoverPasswordToken = recoverPasswordToken;

    return this.save(company);
  }

  async activateCompany(id) {
    const company = await this.findOne(id).catch(handleError);

    company.mailconfirm = true;

    return this.save(company);
  }

  async updatePassword(id, password: string): Promise<CompaniesEntity> {
    const company = await this.findOne(id).catch(handleError);
    const data = {
      recoverPasswordToken: null,
      password,
    };

    delete company.password;

    return this.save({
      ...company,
      ...data,
    }).catch(handleError);
  }

  async deleteCompanyById(id: string): Promise<object> {
    this.delete(id).catch(handleError);

    return { message: 'Company deleted successfully' };
  }
}
