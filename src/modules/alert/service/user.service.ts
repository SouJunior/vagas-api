import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../modules/user/repository/user.repository';
import { PageOptionsDto } from 'src/shared/pagination';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOne(user_id: string) {
    const user = await this.userRepository.findOne(user_id);
    if (user === undefined || user === null) {
      throw new Error('User ID inválido.'); 
    }
    return user;
  }

  async getAllUsers(options: PageOptionsDto) {
    return this.userRepository.getAllUsers(options);
  }
}
