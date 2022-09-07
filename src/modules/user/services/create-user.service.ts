import { UserRepository } from './../repository/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserDto) {
    const response = await this.userRepository.createUser(data);

    return response;
  }
}
