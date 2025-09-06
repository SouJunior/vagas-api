import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/modules/mails/mail.service';
import { UpdateMyPasswordDto } from '../dtos/update-my-password.dto';
import { CompanyRepository } from '../repository/company.repository';
import { CompaniesEntity } from 'src/database/entities/companies.entity';

@Injectable()
export class UpdateCompanyPassword {
  constructor(
    private companyRepository: CompanyRepository,
    private mailService: MailService,
  ) {}

  async execute(
    company: CompaniesEntity,
    { oldPassword, password, confirmNewPassword }: UpdateMyPasswordDto,
  ) {
    const user = await this.companyRepository.findCompanyById(company.id);

    const isOldPassCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPassCorrect) {
      return {
        status: 400,
        data: { message: 'A senha atual está incorreta.' },
      };
    }

    if (password != confirmNewPassword) {
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
