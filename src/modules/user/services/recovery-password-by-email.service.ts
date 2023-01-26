import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import * as crypto from 'crypto';
import { MailService } from '../../mails/mail.service';

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
          message: 'If email exists a email to recovery password was send',
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
        message: 'If email exists a email to recovery password was send',
      },
    };
  }
}
