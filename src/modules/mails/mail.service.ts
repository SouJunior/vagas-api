import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/users.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserEntity) {
    const { email, name, recoverPasswordToken } = user;
    const url = `http://localhost:3333/recovery-password?token=${recoverPasswordToken}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Password!',
      template: './send', 
      context: {
        name: name,
        url,
      },
    });
  }
}

