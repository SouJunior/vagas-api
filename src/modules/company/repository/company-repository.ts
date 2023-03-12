import { NotFoundException } from '@nestjs/common';
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
    const newCompany = this.create(data);
    return this.update(newCompany.id, data)
      .then(() => newCompany)
      .catch(handleError);
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
    const result = await this.update(id, data).catch(handleError);

    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

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

  async updateRecoveryPassword(id, recoverPasswordToken) {
    const company = await this.findOne(id).catch(handleError);

    company.recoverPasswordToken = recoverPasswordToken;

    return this.update(id, company);
  }

  async activateCompany(id) {
    const company = await this.findOne(id).catch(handleError);

    company.mailconfirm = true;

    return this.update(id, company);
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
