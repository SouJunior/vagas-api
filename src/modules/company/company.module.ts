import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from '../upload/upload.module';
import { UserRepository } from '../user/repository/user.repository';
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
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UploadModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([CompanyRepository, UserRepository]),
  ],
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
