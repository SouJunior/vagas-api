import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/modules/mails/mail.service';
import { CreatePasswordHashDto } from '../dtos/update-my-password.dto';
import { CompanyRepository } from '../repository/company.repository';

@Injectable()
export class UpdatePasswordByEmailService {
  constructor(
    private companyRepository: CompanyRepository,
    private mailService: MailService,
  ) {}

  async execute({
    recoverPasswordToken,
    password,
    confirmPassword,
  }: CreatePasswordHashDto) {
    const company =
      await this.companyRepository.findByToken(recoverPasswordToken);

    if (!company) {
      return {
        status: 400,
        data: { message: 'Empresa não encontrada!' },
      };
    }

    if (password != confirmPassword) {
      return {
        status: 400,
        data: { message: 'As senhas não conferem!' },
      };
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const companyUpdated = await this.companyRepository.updatePassword(
      company.id,
      passwordHash,
    );

    await this.mailService.sendCompanyConfirmation(companyUpdated);

    return {
      status: 200,
      data: { message: 'Senha redefinida com sucesso!' },
    };
  }
}
