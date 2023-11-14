import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class DeleteUserService {
  constructor(
    private userRepository: UserRepository,
    ) {}

  async execute(id: string) {
    await this.userRepository.deleteUserById(id);

    return { message: 'User deleted successfully' };
  }
}
