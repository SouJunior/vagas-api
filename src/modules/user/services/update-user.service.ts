import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UpdateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, data: UpdateUserDto) {
    if (!id) {
      throw new BadRequestException('Id not provided');
    }

    const userExists = await this.userRepository.findOneById(id);

    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    const userUpdated = await this.userRepository.updateUser(id, data);

    delete userUpdated.password;

    return userUpdated;
  }
}
