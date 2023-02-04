import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../database/entities/users.entity';

type DataResponse = {
  local: string;
  message: string;
};

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserEntity) {
    const { email, name, recoverPasswordToken } = user;

    const url =
      process.env.NODE_ENV !== 'production'
        ? `${process.env.URL_PROD}${recoverPasswordToken}`
        : `${process.env.URL_DEV}${recoverPasswordToken}`;

    await this.mailerService.sendMail({
      to: email,
      from: process.env.MAIL_FROM,
      subject: 'Password Recover',
      template: './send.hbs',
      context: {
        name,
        url,
      },
    });

    return;
  }

  async sendLogErro({ local, message }: DataResponse) {
    await this.mailerService.sendMail({
      to: process.env.MAIL_LOGS,
      from: process.env.MAIL_LOGS_FROM,
      subject: local,
      template: './logError',
      context: {
        log_error: message,
      },
    });
    return;
  }

  async sendStatusBatchUpdate(
    totalItensUpdate,
    successes,
    failures,
    email,
    name,
  ) {
    await this.mailerService.sendMail({
      to: email,
      from: process.env.MAIL_FROM,
      subject: 'Relatório das atualizações',
      template: './result-updates',
      context: {
        totalItensUpdate,
        successes,
        failures,
        name,
      },
    });
    return;
  }
}
