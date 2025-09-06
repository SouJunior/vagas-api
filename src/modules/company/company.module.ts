import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from '../upload/upload.module';
import { UserRepository } from '../user/repository/user.repository';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './repository/company.repository';
import {
  CreateCompanyService,
  DeleteCompanyService,
  FindAllCompanyService,
  UpdateCompanyService,
} from './services';
import { ActivateCompanyService } from './services/activate-company.service';
import { RecoveryCompanyPasswordByEmail } from './services/recovery-password-by-email.service';
import { UpdatePasswordByEmailService } from './services/update-password-by-email.service';
import { UpdateCompanyPassword } from './services/update-password.service';
import { CompaniesEntity } from 'src/database/entities/companies.entity';
import { UsersEntity } from 'src/database/entities/users.entity';

@Module({
  imports: [
    UploadModule,
    TypeOrmModule.forFeature([CompaniesEntity, UsersEntity]),
  ],
  controllers: [CompanyController],
  providers: [
    CompanyRepository,
    UserRepository,
    CreateCompanyService,
    FindAllCompanyService,
    UpdateCompanyService,
    DeleteCompanyService,
    RecoveryCompanyPasswordByEmail,
    UpdatePasswordByEmailService,
    UpdateCompanyPassword,
    ActivateCompanyService,
  ],
})
export class CompanyModule {}
