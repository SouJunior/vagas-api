import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repository/user.repository';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './repository/company-repository';
import {
  CreateCompanyService,
  FindAllCompanyService,
  FindCompanyById,
  UpdateCompanyService,
} from './services';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository, UserRepository])],
  controllers: [CompanyController],
  providers: [
    CreateCompanyService,
    FindAllCompanyService,
    FindCompanyById,
    UpdateCompanyService,
  ],
})
export class CompanyModule {}
