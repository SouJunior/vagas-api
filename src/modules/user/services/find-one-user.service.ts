import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../../../database/entities/users.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class FindOneUserService {
  constructor(public userRepository: UserRepository) {}

  async execute(user: UsersEntity) {
    delete user.password;
    delete user.type;
    delete user.ip;
    delete user.recoverPasswordToken;

    return user;
  }
}
