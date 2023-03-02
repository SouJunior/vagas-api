import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { MailService } from '../../mails/mail.service';
import { CompanyRepository } from '../repository/company-repository';

@Injectable()
export class RecoveryCompanyPasswordByEmail {
  constructor(
    private companyRepository: CompanyRepository,
    private mailService: MailService,
  ) {}

  async execute(email: string) {
    const companyExists = await this.companyRepository.findOneByEmail(email);
    if (!companyExists) {
      return {
        status: 200,
        data: {
          message: 'Email not found!',
        },
      };
    }

    const recoverPasswordToken = crypto.randomBytes(32).toString('hex');

    const { id } = companyExists;

    const companyUpdated = await this.companyRepository.updateRecoveryPassword(
      id,
      recoverPasswordToken,
    );

    await this.mailService.sendCompanyConfirmation(companyUpdated);

    return {
      status: 200,
      data: {
        message: 'If email exists, a email to recovery password was send',
      },
    };
  }
}
