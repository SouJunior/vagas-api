import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../../../database/entities/users.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UpdateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(user: UsersEntity, data: UpdateUserDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await this.userRepository.updateUser(user.id, data);

    return { message: 'User updated successfully' };
  }
}
