import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyIdDto } from './dtos/company-id.dto';
import { CreateCompanyDto } from './dtos/create-company.dto';
import {
  CreateCompanyService,
  FindAllCompanyService,
  FindCompanyById,
} from './services';

@Controller('company')
export class CompanyController {
  constructor(
    private createCompanyService: CreateCompanyService,
    private findAllCompanyService: FindAllCompanyService,
    private findCompanyById: FindCompanyById,
  ) {}

  @Post()
  async createCompany(@Body() data: CreateCompanyDto) {
    return this.createCompanyService.execute(data);
  }

  @Get()
  async getAllCompanies() {
    return this.findAllCompanyService.execute();
  }

  @Get(':id')
  async getcompanyById(@Param() { id }: CompanyIdDto) {
    return this.findCompanyById.execute(+id);
  }
}
