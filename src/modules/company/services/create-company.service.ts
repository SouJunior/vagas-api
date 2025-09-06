import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/modules/mails/mail.service';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { CompanyRepository } from '../repository/company.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';

@Injectable()
export class CreateCompanyService {
  constructor(
    private companyRepository: CompanyRepository,
    private userRepository: UserRepository,
    private mailService: MailService,
  ) {}

  async execute(data: CreateCompanyDto) {
    const { email, password, passwordConfirmation, cnpj } = data;

    // Normalize email: trim whitespace and convert to lowercase
    const normalizedEmail = email.trim().toLowerCase();

    const emailAlreadyInUseCompany =
      await this.companyRepository.findOneByEmail(normalizedEmail);

    const emailAlreadyInUseUser =
      await this.userRepository.findOneByEmail(normalizedEmail);

    if (emailAlreadyInUseCompany || emailAlreadyInUseUser) {
      return {
        status: 404,
        data: {
          message: 'E-mail já cadastrado',
        },
      };
    }

    if (password != passwordConfirmation) {
      return {
        status: 404,
        data: {
          message: 'As senhas precisam ser idênticas',
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
    data.email = normalizedEmail; // Use normalized email for insert

    try {
      const response = await this.companyRepository.createCompany(data);

      delete response.password;
      delete response.recoverPasswordToken;

      await this.mailService.sendCompanyCreationConfirmation(response);

      return {
        status: 201,
        data: response,
      };
    } catch (error) {
      // Handle PostgreSQL unique violation error (23505)
      if (error.code === '23505') {
        return {
          status: 409,
          data: {
            message: 'E-mail já cadastrado',
          },
        };
      }
      // Re-throw other errors
      throw error;
    }
  }
}
