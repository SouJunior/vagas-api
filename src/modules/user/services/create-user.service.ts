import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

import { MailService } from '../../../modules/mails/mail.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repository/user.repository';
import { CompanyRepository } from 'src/modules/company/repository/company-repository';

@Injectable()
export class CreateUserService {
  constructor(
    private userRepository: UserRepository,
    private companyRepository: CompanyRepository,
    private mailService: MailService,
  ) {}

  async execute(data: CreateUserDto, req: Request) {
    const { email, password } = data;

    data['ip'] = req.ip;

    const emailAlreadyInUseCompany =
      await this.companyRepository.findOneByEmail(email);

    const emailAlreadyInUseUser =
      await this.userRepository.findOneByEmail(email);

    if (emailAlreadyInUseCompany || emailAlreadyInUseUser) {
      return {
        status: 404,
        data: {
          message: 'E-mail já cadastrado',
        },
      };
    }

    data.password = await bcrypt.hash(password, 10);

    delete data.confirmPassword;
    try {
      const response = await this.userRepository.createUser(data);

      delete response.password;
      delete response.recoverPasswordToken;
      delete response.ip;

      await this.mailService.sendUserCreationConfirmation(response);

      return {
        status: 201,
        data: response,
      };
    } catch (error) {
      // Postgres: 23505 | MySQL: ER_DUP_ENTRY
      if (
        error?.code === '23505' ||
        error?.code === 'ER_DUP_ENTRY' ||
        error?.errno === 1062 // MySQL
      ) {
        return {
          status: 409,
          data: {
            message: 'E-mail já cadastrado',
          },
        };
      }
      throw error;
    }
  }
}
