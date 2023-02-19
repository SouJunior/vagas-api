import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserDto) {
    const { email, password, cpf } = data;

    const userAlreadyExists = await this.userRepository.findOneByEmail(email);

    // if (userAlreadyExists) {
    //   throw new BadRequestException(`Email ${email} already exists`);
    // }

    if (userAlreadyExists) {
      return {
        status: 404,
        data: {
          message: 'Email already exists',
        },
      };
    }

    const cpfAlreadyInUse = await this.userRepository.findOneByCpf(cpf);

    if (cpfAlreadyInUse) {
      throw new BadRequestException(`This CPF is already in use`);
    }

    data.password = await bcrypt.hash(password, 10);

    const response = await this.userRepository.createUser(data);

    delete response.password;
    delete response.recoverPasswordToken;

    return {
      status: 201,
      data: response,
    };
  }
}
