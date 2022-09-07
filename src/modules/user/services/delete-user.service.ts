import { UserRepository } from './../repository/user.repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number) {
    if (!id) {
      throw new BadRequestException('Id not provided');
    }

    const jobExists = await this.userRepository.findOneById(id);

    if (!jobExists) {
      throw new BadRequestException('User not found');
    }

    return this.userRepository.deleteUserById(id);
  }
}
