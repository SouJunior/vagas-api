import { Injectable, NotFoundException } from '@nestjs/common';
import { CompaniesEntity } from 'src/database/entities/companies.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/shared/pagination';
import { Repository } from 'typeorm';
import { handleError } from '../../../shared/utils/handle-error.util';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { UpdateMyPasswordDto } from '../dtos/update-my-password.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyRepository {

  constructor(@InjectRepository(CompaniesEntity) private companyRepository: Repository<CompaniesEntity>) {}

  async createCompany(data: CreateCompanyDto): Promise<CompaniesEntity> {
    delete data.passwordConfirmation;
    return this.companyRepository.save(data).catch(handleError);
  }

  async findAllCompany(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CompaniesEntity>> {
    const queryBuilder = this.companyRepository.createQueryBuilder('companies');

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
    if (!id) {
      throw new NotFoundException('Invalid company ID');
    }
      const company = await this.companyRepository.findOneBy({id}).catch(handleError);
  
      if (!company) {
        throw new NotFoundException('Company not found');
      }
  
      console.log('Company with jobs:', company);
  
      return company;
    }

  async UpdateCompanyById(id: string, data: any) {
    const company = await this.companyRepository.findOneBy({id}).catch(handleError);

    await this.companyRepository.update(id, {
      ...company,
      ...data,
    }).catch(handleError);

    return this.companyRepository.findOneBy({id}).catch(handleError);
  }

  async findOneByEmail(email: string): Promise<CompaniesEntity> {
    return this.companyRepository.findOneBy({ email }).catch(handleError);
  }

  async findEmailInDatabase(email: string): Promise<CompaniesEntity> {
    return this.companyRepository.findOneBy({ email }).catch(handleError);
  }

  async findByToken(recoverPasswordToken: string): Promise<CompaniesEntity> {
    return this.companyRepository.findOneBy({ recoverPasswordToken }).catch(handleError);
  }

  async findOneById(id: string): Promise<CompaniesEntity> {
    return this.companyRepository.findOneBy({id}).catch(handleError);
  }

  async findOneByCnpj(cnpj: string): Promise<CompaniesEntity> {
    return this.companyRepository.findOneBy({cnpj}).catch(handleError);
  }

  async updateMyPassword(updateMyPasswordDto: UpdateMyPasswordDto, id) {
    const company = await this.companyRepository.findOneBy({id}).catch(handleError);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.companyRepository.update(id, updateMyPasswordDto)
      .then(() => {
        return this.companyRepository.findOneBy({id});
      })
      .catch(handleError);
  }

  async updateRecoveryPassword(
    id,
    recoverPasswordToken,
  ): Promise<CompaniesEntity> {
    const company = await this.companyRepository.findOneBy({id}).catch(handleError);

    company.recoverPasswordToken = recoverPasswordToken;

    await this.companyRepository.save(company).catch(handleError);

    return company;
  }

  async updateCompany(company: CompaniesEntity) {
    await this.companyRepository.save(company);

    return this.findOneById(company.id);
  }

  async activateCompany(id: string) {
    const company = await this.companyRepository.findOneBy({id}).catch(handleError);

    company.mailConfirm = true;

    await this.companyRepository.update(id, company);

    return company;
  }

  async updatePassword(id, password: string): Promise<CompaniesEntity> {
    const company = await this.companyRepository.findOneBy({id}).catch(handleError);
    const data = {
      recoverPasswordToken: null,
      password,
    };

    delete company.password;

    await this.companyRepository.update(id, {
      ...company,
      ...data,
    }).catch(handleError);

    return this.companyRepository.findOneBy({id}).catch(handleError);
  }

  async deleteCompanyById(id: string): Promise<object> {
    this.companyRepository.delete(id).catch(handleError);

    return { message: 'Company deleted successfully' };
  }
}
