import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

import { MailService } from '../../../modules/mails/mail.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repository/user.repository';
import { CompanyRepository } from 'src/modules/company/repository/company.repository';

@Injectable()
export class CreateUserService {
  constructor(
    private userRepository: UserRepository,
    private companyRepository: CompanyRepository,
    private mailService: MailService,
  ) {}

  async execute(data: CreateUserDto, req: Request) {
    const { email, password } = data;

    const normalizedEmail = email.trim().toLowerCase();

    data['ip'] = req.ip;

    const emailAlreadyInUseCompany =
      await this.companyRepository.findOneByEmail(normalizedEmail);

    const emailAlreadyInUseUser =
      await this.userRepository.findOneByEmail(normalizedEmail);

    if (emailAlreadyInUseCompany || emailAlreadyInUseUser) {
      throw new ConflictException('E-mail já cadastrado');
    }

    data.password = await bcrypt.hash(password, 10);
    data.email = normalizedEmail; // Use normalized email for insert

    delete data.confirmPassword;

    try {
      const response = await this.userRepository.createUser(data);

      delete response.password;
      delete response.recoverPasswordToken;
      delete response.ip;

      await this.mailService.sendUserCreationConfirmation(response);

      return response;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('E-mail já cadastrado');
      }
      throw error;
    }
  }
}
