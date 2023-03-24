import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MailService } from '../../../modules/mails/mail.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class CreateUserService {
  constructor(
    private userRepository: UserRepository,
    private mailService: MailService,
  ) {}

  async execute(data: CreateUserDto) {
    const { email, password } = data;

    const userAlreadyExists = await this.userRepository.findOneByEmail(email);

    if (userAlreadyExists) {
      return {
        status: 404,
        data: {
          message: 'E-mail já cadastrado.',
        },
      };
    }

    // const cpfAlreadyInUse = await this.userRepository.findOneByCpf(cpf);

    // if (cpfAlreadyInUse) {
    //   return {
    //     status: 404,
    //     data: {
    //       message: `CPF já cadastrado.`,
    //     },
    //   };
    // }

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
