import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class ActivateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    if (!id) {
      throw new BadRequestException('Id not provided');
    }

    const userExists = await this.userRepository.findOneById(id);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const user = await this.userRepository.activateUser(id);

    delete user.password;
    delete user.recoverPasswordToken;

    return user;
  }
}
