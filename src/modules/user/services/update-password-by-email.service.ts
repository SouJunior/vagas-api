import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreatePasswordHashDto } from '../dtos/update-my-password.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UpdatePasswordByEmailService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    recoverPasswordToken,
    password,
    confirmPassword,
  }: CreatePasswordHashDto) {
    const user = await this.userRepository.findByToken(recoverPasswordToken);

    if (!user) {
      return {
        status: 400,
        data: { message: 'User not found' },
      };
    }

    if (password != confirmPassword) {
      return {
        status: 400,
        data: { message: 'Password mismatch' },
      };
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const userUpdated = await this.userRepository.updatePassword(
      user.id,
      passwordHash,
    );

    return {
      status: 200,
      data: userUpdated,
    };
  }
}
