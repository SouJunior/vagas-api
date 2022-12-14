import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, data: UpdateUserDto) {
    if (!id) {
      throw new BadRequestException('Id not provided');
    }

    const userExists = await this.userRepository.findOneById(id);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const userUpdated = await this.userRepository.updateUser(id, data);

    delete userUpdated.password;

    return userUpdated;
  }
}
