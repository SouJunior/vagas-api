import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/modules/mails/mail.service';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { CompanyRepository } from '../repository/company-repository';

@Injectable()
export class CreateCompanyService {
  constructor(
    private companyRepository: CompanyRepository,
    private mailService: MailService,
  ) {}

  async execute(data: CreateCompanyDto) {
    const { email, password, cnpj } = data;
    const companyAlreadyExists = await this.companyRepository.findOneByEmail(
      email,
    );

    if (companyAlreadyExists) {
      return {
        status: 404,
        data: {
          message: 'Email already exists',
        },
      };
    }

    const cnpjAlreadyInUse = await this.companyRepository.findOneByCnpj(cnpj);

    if (cnpjAlreadyInUse) {
      return {
        status: 404,
        data: {
          message: `This CNPJ is already in use`,
        },
      };
    }

    data.password = await bcrypt.hash(password, 10);

    const response = await this.companyRepository.createCompany(data);

    delete response.password;
    delete response.recoverPasswordToken;

    await this.mailService.sendCompanyCreationConfirmation(response);

    return {
      status: 201,
      data: response,
    };
  }
}
