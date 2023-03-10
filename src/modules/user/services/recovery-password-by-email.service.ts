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

    const { id } = userExists;

    const userUpdated = await this.userRepository.updateRecoveryPassword(
      id,
      recoverPasswordToken,
    );

    await this.mailService.sendUserConfirmation(userUpdated);

    return {
      status: 200,
      data: {
        message:
          'Se o e-mail existir no nosso banco será enviado um email com o link para recuperação da senha.',
      },
    };
  }
}
