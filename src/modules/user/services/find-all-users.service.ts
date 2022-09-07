import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class FindAllUsersService {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const users = await this.userRepository.getAllUsers();

    if (users.length <= 0) {
      return { message: 'Users is empty' };
    }

    return users;
  }
}
