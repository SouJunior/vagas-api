import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreatePasswordHashDto } from '../dtos/update-my-password.dto';
import { CompanyRepository } from '../repository/company-repository';

@Injectable()
export class UpdatePasswordByEmailService {
  constructor(private companyRepository: CompanyRepository) {}

  async execute({
    recoverPasswordToken,
    password,
    confirmPassword,
  }: CreatePasswordHashDto) {
    const company = await this.companyRepository.findByToken(
      recoverPasswordToken,
    );

    if (!company) {
      return {
        status: 400,
        data: { message: 'Company not found' },
      };
    }

    if (password != confirmPassword) {
      return {
        status: 400,
        data: { message: 'Password mismatch' },
      };
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const companyUpdated = await this.companyRepository.updatePassword(
      company.id,
      passwordHash,
    );

    return {
      status: 200,
      data: companyUpdated,
    };
  }
}
