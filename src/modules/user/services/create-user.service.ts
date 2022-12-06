import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserDto) {
    const { email, password } = data;

    const userAllreadyExists = await this.userRepository.findOneByEmail(email);

    if (userAllreadyExists) {
      throw new BadRequestException(`Email ${email} already exists`);
    }

    data.password = await bcrypt.hash(password, 10);

    const response = await this.userRepository.createUser(data);

    delete response.password;

    return response;
  }
}
