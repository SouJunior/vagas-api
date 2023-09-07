import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

import { MailService } from '../../../modules/mails/mail.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class CreateUserService {
  constructor(
    private userRepository: UserRepository,
    private mailService: MailService,
  ) {}

  async execute(data: CreateUserDto, req: Request) {
    const { email, password } = data;

    data['ip'] = req.ip;

    const userAlreadyExists = await this.userRepository.findOneByEmail(email);

    if (userAlreadyExists) {
      return {
        status: 400,
        data: {
          message: 'E-mail já cadastrado.',
        },
      };
    }

    data.password = await bcrypt.hash(password, 10);

    delete data.confirmPassword;

    const response = await this.userRepository.createUser(data);

    delete response.password;
    delete response.recoverPasswordToken;
    delete response.ip;

    await this.mailService.sendUserCreationConfirmation(response);

    return {
      status: 201,
      data: response,
    };
  }
}
