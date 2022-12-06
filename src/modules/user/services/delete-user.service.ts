import { UserRepository } from '../repository/user.repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    if (!id) {
      throw new BadRequestException('Id not provided');
    }

    const userExists = await this.userRepository.findOneById(id);

    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    return this.userRepository.deleteUserById(id);
  }
}
