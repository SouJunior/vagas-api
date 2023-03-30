import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { MailService } from '../../mails/mail.service';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class RecoveryPasswordByEmail {
  constructor(
    private userRepository: UserRepository,
    private mailService: MailService,
  ) {}

  async execute(email: string) {
    const userExists = await this.userRepository.findOneByEmail(email);
    if (!userExists) {
      return {
        status: 200,
        data: {
          message: 'Email não encontrado!',
        },
      };
    }

    const recoverPasswordToken = crypto.randomBytes(32).toString('hex');

    const userUpdated = await this.userRepository.updateRecoveryPassword(
      userExists.id,
      recoverPasswordToken,
    );

    await this.mailService.sendUserConfirmation(userUpdated);

    return {
      status: 200,
      data: {
        message:
          'Será encaminhado uma mensagem para o e-mail cadastrado, informando os próximos passos para a redefinição da senha.',
      },
    };
  }
}
