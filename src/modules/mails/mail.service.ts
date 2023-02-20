import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CompaniesEntity } from 'src/database/entities/companies.entity';
import { UsersEntity } from 'src/database/entities/users.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UsersEntity) {
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

  async sendUserCreationConfirmation(user: UsersEntity) {
    const { email, name } = user;

    await this.mailerService.sendMail({
      to: email,
      subject: 'User Created!',
      template: './createuser',
      context: {
        name: name,
      },
    });
  }

  // async sendCompanyConfirmation(company: CompaniesEntity) {
  //   const { email, company_name, recoverPasswordToken } = company;
  //   const url = `http://localhost:3333/recovery-password?token=${recoverPasswordToken}`;

  //   await this.mailerService.sendMail({
  //     to: email,
  //     subject: 'Reset Password!',
  //     template: './send',
  //     context: {
  //       name: company_name,
  //       url,
  //     },
  //   });
  // }
}
