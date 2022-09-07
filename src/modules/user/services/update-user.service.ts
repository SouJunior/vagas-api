import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UpdateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number, data: UpdateUserDto) {
    if (!id) {
      throw new BadRequestException('Id not provided');
    }

    const jobExists = await this.userRepository.findOneById(id);

    if (!jobExists) {
      throw new BadRequestException('Job not found');
    }

    return this.userRepository.updateUser(id, data);
  }
}
