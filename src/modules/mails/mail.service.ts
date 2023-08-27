import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CompaniesEntity } from 'src/database/entities/companies.entity';
import { UsersEntity } from 'src/database/entities/users.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UsersEntity): Promise<void> {
    const { email, name, recoverPasswordToken } = user;
    const url = `${process.env.recoveryPassLink}?token=${recoverPasswordToken}&type=USER`;

    if (recoverPasswordToken) {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Recuperação de Senha!',
        template: './send',
        context: {
          name: name,
          url,
        },
      });
    } else {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Senha alterada com Sucesso!',
        template: './passwordupdate',
        context: {
          name: name,
          url,
        },
      });
    }
  }

  async sendUserCreationConfirmation(user: UsersEntity) {
    const { email, name, id } = user;

    const url = `http://localhost:3333/userconfirmation?id=${id}&type=USER`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Usuário criado!',
      template: './confirmEmailUser',
      context: {
        name: name,
        url,
      },
    });

    return;
  }

  async sendCompanyConfirmation(company: CompaniesEntity) {
    const { email, companyName, recoverPasswordToken } = company;
    const url = `${process.env.recoveryPassLink}?token=${recoverPasswordToken}&type=COMPANY`;

    if (recoverPasswordToken) {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Recuperação de Senha!',
        template: './send',
        context: {
          name: companyName,
          url,
        },
      });
    } else {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Senha alterada com Sucesso!',
        template: './passwordupdate',
        context: {
          name: companyName,
        },
      });
    }
  }

  async sendCompanyCreationConfirmation(company: CompaniesEntity) {
    const { email, companyName, id } = company;

    const url = `http://localhost:3333/companyconfirmation?id=${id}&type=COMPANY`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Empresa criado!',
      template: './confirmEmailCompany',
      context: {
        name: companyName,
        url,
      },
    });
  }

  async sendMail({ subject, template, context, email }) {
    await this.mailerService.sendMail({
      to: email,
      subject,
      template,
      context,
    });
  }
}
