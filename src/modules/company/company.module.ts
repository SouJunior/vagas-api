import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repository/user.repository';
import { UserModule } from '../user/user.module';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './repository/company-repository';
import {
  CreateCompanyService,
  DeleteCompanyService,
  FindAllCompanyService,
  UpdateCompanyService,
} from './services';
import { ActivateCompanyService } from './services/activate-company.service';
import { RecoveryCompanyPasswordByEmail } from './services/recovery-password-by-email.service';
import { UpdatePasswordByEmailService } from './services/update-password-by-email.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository, UserRepository])],
  controllers: [CompanyController],
  providers: [
    CreateCompanyService,
    FindAllCompanyService,
    UpdateCompanyService,
    DeleteCompanyService,
    RecoveryCompanyPasswordByEmail,
    UpdatePasswordByEmailService,
    ActivateCompanyService,
  ],
})
export class CompanyModule {}
