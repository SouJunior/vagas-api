import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class FindOneUserService {
  constructor(public userRepository: UserRepository) {}

  async execute(id: number) {
    if (!id) {
      throw new BadRequestException('Id not provider');
    }

    const userExists = await this.userRepository.findOneById(id);

    if (!userExists) {
      throw new BadRequestException('User not found');
    }

    return userExists;
  }
}
