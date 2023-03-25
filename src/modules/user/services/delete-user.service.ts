import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../../../database/entities/users.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(user: UsersEntity) {
    await this.userRepository.deleteUserById(user.id);

    return { message: 'User deleted successfully' };
  }
}
