import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repository/user.repository';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './repository/company-repository';
import { CreateCompanyService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository, UserRepository])],
  controllers: [CompanyController],
  providers: [CreateCompanyService],
})
export class CompanyModule {}
