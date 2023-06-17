import { NotFoundException } from '@nestjs/common';
import { CompaniesEntity } from 'src/database/entities/companies.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/shared/pagination';
import { EntityRepository, Repository } from 'typeorm';
import { handleError } from '../../../shared/utils/handle-error.util';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { UpdateMyPasswordDto } from '../dtos/update-my-password.dto';

@EntityRepository(CompaniesEntity)
export class CompanyRepository extends Repository<CompaniesEntity> {
  async createCompany(data: CreateCompanyDto): Promise<CompaniesEntity> {
    delete data.passwordConfirmation;
    return this.save(data);
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
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount().catch(handleError);
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findCompanyById(id: string): Promise<CompaniesEntity> {
    return this.findOne(id, {
      relations: ['jobs'],
    }).catch(handleError);
  }

  async UpdateCompanyById(id: string, data: any) {
    const company = await this.findOne(id).catch(handleError);

    await this.update(id, {
      ...company,
      ...data,
    }).catch(handleError);

    return this.findOne(id).catch(handleError);
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

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.update(id, updateMyPasswordDto)
      .then(() => {
        return this.findOne(id);
      })
      .catch(handleError);
  }

  async updateRecoveryPassword(
    id,
    recoverPasswordToken,
  ): Promise<CompaniesEntity> {
    const company = await this.findOne(id).catch(handleError);

    company.recoverPasswordToken = recoverPasswordToken;

    await this.save(company);

    return company;
  }

  async updateCompany(company: CompaniesEntity) {
    await this.save(company);

    return this.findOneById(company.id);
  }

  async activateCompany(id: string) {
    const company = await this.findOne(id).catch(handleError);

    company.mailConfirm = true;

    await this.update(id, company);

    return company;
  }

  async updatePassword(id, password: string): Promise<CompaniesEntity> {
    const company = await this.findOne(id).catch(handleError);
    const data = {
      recoverPasswordToken: null,
      password,
    };

    delete company.password;

    await this.update(id, {
      ...company,
      ...data,
    }).catch(handleError);

    return this.findOne(id).catch(handleError);
  }

  async deleteCompanyById(id: string): Promise<object> {
    this.delete(id).catch(handleError);

    return { message: 'Company deleted successfully' };
  }
}
