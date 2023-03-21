import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CompaniesEntity } from 'src/database/entities/companies.entity';
import { PageOptionsDto } from '../../shared/pagination';
import GetEntity from '../../shared/pipes/pipe-entity.pipe';
import { EmailDto } from '../user/dtos/email-user.dto';
import { CompanyIdDto } from './dtos/company-id.dto';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.sto';
import { CreatePasswordHashDto } from './dtos/update-my-password.dto';
import {
  CreateCompanyService,
  DeleteCompanyService,
  FindAllCompanyService,
  UpdateCompanyService,
} from './services';
import { ActivateCompanyService } from './services/activate-company.service';
import { RecoveryCompanyPasswordByEmail } from './services/recovery-password-by-email.service';
import { UpdatePasswordByEmailService } from './services/update-password-by-email.service';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(
    private createCompanyService: CreateCompanyService,
    private findAllCompanyService: FindAllCompanyService,
    private updateCompanyService: UpdateCompanyService,
    private deleteCompanyService: DeleteCompanyService,
    private recoveryPasswordByEmail: RecoveryCompanyPasswordByEmail,
    private updatePasswordByEmailService: UpdatePasswordByEmailService,
    private activateCompanyService: ActivateCompanyService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Cadastrar uma empresa.',
  })
  async createCompany(
    @Body() createcompany: CreateCompanyDto,
    @Res() res: Response,
  ) {
    const { data, status } = await this.createCompanyService.execute(
      createcompany,
    );

    return res.status(status).send(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todas as empresas.',
  })
  async getAllCompanies(@Query() pageOptionsDto: PageOptionsDto) {
    return this.findAllCompanyService.execute(pageOptionsDto);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @ApiOperation({
    summary: 'Buscar uma empresa por id.',
  })
  async getcompanyById(
    @Param('id', new GetEntity(CompaniesEntity))
    company: CompaniesEntity,
  ) {
    return company;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar uma empresa por id.',
  })
  async updatecompanyById(
    @Param() { id }: CompanyIdDto,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Res() res: Response,
  ) {
    const { data, status } = await this.updateCompanyService.execute(
      id,
      updateCompanyDto,
    );
    return res.status(status).send(data);
  }

  @Patch('recovery-password')
  @ApiOperation({
    summary: 'Send email to recovery password.',
  })
  async recoveryPasswordSendEmail(
    @Body() { email }: EmailDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.recoveryPasswordByEmail.execute(email);

    return res.status(status).send(data);
  }

  @Patch('update_password')
  @ApiOperation({
    summary: 'Company update password.',
  })
  async updatePassword(
    @Body() updatePassword: CreatePasswordHashDto,
    @Res() res: Response,
  ) {
    const { data, status } = await this.updatePasswordByEmailService.execute(
      updatePassword,
    );
    return res.status(status).send(data);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Ativar uma empresa pelo ID',
  })
  async activateCompany(@Param('id') id: string, @Res() res: Response) {
    const { data, status } = await this.activateCompanyService.execute(id);
    return res.status(status).send(data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir uma empresa por id.',
  })
  async deleteCompanyById(@Param() { id }: CompanyIdDto, @Res() res: Response) {
    const { data, status } = await this.deleteCompanyService.execute(id);
    return res.status(status).send(data);
  }
}
