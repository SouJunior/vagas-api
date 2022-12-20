import { UserRepository } from './../repository/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserDto) {
    const { email, password, cpf, policies } = data;

    if (!policies) {
      throw new BadRequestException('Unacceptable Policies');
    }

    const emailAlreadyInUse = await this.userRepository.findOneByEmail(email);

    if (emailAlreadyInUse) {
      throw new BadRequestException(`Email ${email} already exists`);
    }

    const cpfAlreadyInUse = await this.userRepository.findOneByCpf(cpf);

    if (cpfAlreadyInUse) {
      throw new BadRequestException(`This CPF is already in use`);
    }

    data.password = await bcrypt.hash(password, 10);

    const response = await this.userRepository.createUser(data);

    delete response.password;

    return response;
  }
}
