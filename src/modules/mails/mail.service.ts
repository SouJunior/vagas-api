import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CompaniesEntity } from 'src/database/entities/companies.entity';
import { UsersEntity } from 'src/database/entities/users.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UsersEntity): Promise<void> {
    const { email, name, recoverPasswordToken } = user;
    const url = `http://localhost:3333/recovery-password?token=${recoverPasswordToken}`;

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

    const url = `http://localhost:3333/userconfirmation?id=${id}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Usuário criado!',
      template: './create',
      context: {
        name: name,
        url,
      },
    });

    return;
  }

  async sendCompanyConfirmation(company: CompaniesEntity) {
    const { email, company_name, recoverPasswordToken } = company;
    const url = `http://localhost:3333/recovery-password?token=${recoverPasswordToken}`;

    if (recoverPasswordToken) {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Recuperação de Senha!',
        template: './send',
        context: {
          name: company_name,
          url,
        },
      });
    } else {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Senha alterada com Sucesso!',
        template: './passwordupdate',
        context: {
          name: company_name,
        },
      });
    }
  }

  async sendCompanyCreationConfirmation(company: CompaniesEntity) {
    const { email, company_name, id } = company;

    const url = `http://localhost:3333/companyconfirmation?id=${id}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Empresa criado!',
      template: './create',
      context: {
        name: company_name,
        url,
      },
    });
  }
}
