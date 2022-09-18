import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';

@Module({
  controllers: [CompanyController]
})
export class CompanyModule {}
