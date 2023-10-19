import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class FindOneUserService {
  constructor(public userRepository: UserRepository) {}

  async execute(id: string) {
    const userExists = await this.userRepository.findOneById(id);

    delete userExists.password;
    delete userExists.type;
    delete userExists.ip;
    delete userExists.recoverPasswordToken;

    return userExists;
  }
}
