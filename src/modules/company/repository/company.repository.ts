import { Injectable, NotFoundException } from '@nestjs/common';
import { CompaniesEntity } from '../../../database/entities/companies.entity';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '../../../shared/pagination';
import { Repository } from 'typeorm';
import { handleError } from '../../../shared/utils/handle-error.util';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { UpdateMyPasswordDto } from '../dtos/update-my-password.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository(CompaniesEntity)
    private companyRepository: Repository<CompaniesEntity>,
  ) {}

  async createCompany(data: CreateCompanyDto): Promise<CompaniesEntity> {
    delete data.passwordConfirmation;
    return this.companyRepository.save(data).catch(handleError);
  }

  async findAllCompany(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CompaniesEntity>> {
    const allowedOrderColumns = [
      'id',
      'companyName',
      'email',
      'cnpj',
      'companyType',
      'companySize',
      'uf',
      'companySite',
      'description',
      'created_at',
      'updated_at',
      'mailConfirm',
    ];

    const orderColumn = allowedOrderColumns.includes(
      pageOptionsDto.orderByColumn,
    )
      ? pageOptionsDto.orderByColumn
      : 'created_at';

    const queryBuilder = this.companyRepository.createQueryBuilder('companies');

    queryBuilder
      .orderBy(`companies.${orderColumn}`, pageOptionsDto.order)
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take)
      .take(pageOptionsDto.take);

    const [entities, itemCount] = await queryBuilder
      .getManyAndCount()
      .catch(handleError);

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findCompanyById(id: string): Promise<CompaniesEntity> {
    if (!id) {
      throw new NotFoundException('Invalid company ID');
    }
    const company = await this.findOneById(id);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  async updateCompanyById(
    id: string,
    data: Partial<CompaniesEntity>,
  ): Promise<CompaniesEntity> {
    const result = await this.companyRepository
      .update(id, data)
      .catch(handleError);
    if (result.affected === 0) {
      throw new NotFoundException('Company not found');
    }

    return this.findOneById(id);
  }

  async findOneByEmail(email: string): Promise<CompaniesEntity> {
    return this.companyRepository.findOneBy({ email }).catch(handleError);
  }

  async findByToken(recoverPasswordToken: string): Promise<CompaniesEntity> {
    return this.companyRepository
      .findOneBy({ recoverPasswordToken })
      .catch(handleError);
  }

  async findOneById(id: string): Promise<CompaniesEntity> {
    return this.companyRepository.findOneBy({ id }).catch(handleError);
  }

  async findOneByCnpj(cnpj: string): Promise<CompaniesEntity> {
    return this.companyRepository.findOneBy({ cnpj }).catch(handleError);
  }

  async updateMyPassword(
    updateMyPasswordDto: UpdateMyPasswordDto,
    id: CompaniesEntity['id'],
  ): Promise<CompaniesEntity> {
    const result = await this.companyRepository
      .update(id, updateMyPasswordDto)
      .catch(handleError);

    if (result.affected === 0) {
      throw new NotFoundException('Company not found');
    }

    const updatedCompany = await this.findOneById(id);

    if (!updatedCompany) {
      throw new NotFoundException('Company not found after update');
    }

    return updatedCompany;
  }

  async updateRecoveryPassword(
    id: string,
    recoverPasswordToken: string,
  ): Promise<CompaniesEntity> {
    const result = await this.companyRepository
      .update(id, { recoverPasswordToken })
      .catch(handleError);

    if (result.affected === 0) {
      throw new NotFoundException('Company not found');
    }

    return this.findOneById(id);
  }

  async updateCompany(company: CompaniesEntity): Promise<CompaniesEntity> {
    return this.companyRepository.save(company).catch(handleError);
  }

  async activateCompany(id: string): Promise<CompaniesEntity> {
    const result = await this.companyRepository
      .update(id, { mailConfirm: true })
      .catch(handleError);

    if (result.affected === 0) {
      throw new NotFoundException('Company not found');
    }

    return this.findOneById(id);
  }

  async updatePassword(id: string, password: string): Promise<CompaniesEntity> {
    const updateData = {
      recoverPasswordToken: null,
      password,
    };

    const result = await this.companyRepository
      .update(id, updateData)
      .catch(handleError);

    if (result.affected === 0) {
      throw new NotFoundException('Company not found');
    }

    return this.findOneById(id);
  }

  async deleteCompanyById(id: string): Promise<object> {
    const result = await this.companyRepository.delete(id).catch(handleError);

    if (result.affected === 0) {
      throw new NotFoundException('Company not found');
    }

    return { message: 'Company deleted successfully' };
  }
}
