import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/modules/mails/mail.service';
import { CreatePasswordHashDto } from '../dtos/update-my-password.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UpdatePasswordByEmailService {
  constructor(
    private userRepository: UserRepository,
    private mailService: MailService,
  ) {}

  async execute({
    recoverPasswordToken,
    password,
    confirmPassword,
  }: CreatePasswordHashDto) {
    const user = await this.userRepository.findByToken(recoverPasswordToken);

    if (!user) {
      return {
        status: 400,
        data: { message: 'Usuário não encontrado!' },
      };
    }

    if (password != confirmPassword) {
      return {
        status: 400,
        data: { message: 'As senhas não conferem!' },
      };
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const userUpdated = await this.userRepository.updatePassword(
      user.id,
      passwordHash,
    );

    await this.mailService.sendUserConfirmation(userUpdated);

    return {
      status: 200,
      data: { message: 'Senha redefinida com sucesso!' },
    };
  }
}
