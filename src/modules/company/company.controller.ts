import { Body, Controller, Post } from '@nestjs/common';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { CreateCompanyService } from './services';

@Controller('company')
export class CompanyController {
  constructor(private createCompanyService: CreateCompanyService) {}

  @Post()
  async createCompany(@Body() data: CreateCompanyDto) {
    return this.createCompanyService.execute(data);
  }
}
