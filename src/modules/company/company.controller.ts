import { UpdateCompanyDto } from './dtos/update-company.sto';
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
import { CompanyIdDto } from './dtos/company-id.dto';
import { CreateCompanyDto } from './dtos/create-company.dto';
import {
  CreateCompanyService,
  DeleteCompanyService,
  FindAllCompanyService,
  FindCompanyById,
  UpdateCompanyService,
} from './services';
import { PageOptionsDto } from '../../shared/pagination';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailDto } from '../user/dtos/email-user.dto';
import { CreatePasswordHashDto } from '../user/dtos/update-my-password.dto';
import { RecoveryPasswordByEmail } from './services/recovery-password-by-email.service';
import { UpdatePasswordByEmailService } from './services/update-password-by-email.service';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(
    private createCompanyService: CreateCompanyService,
    private findAllCompanyService: FindAllCompanyService,
    private findCompanyById: FindCompanyById,
    private updateCompanyService: UpdateCompanyService,
    private deleteCompanyService: DeleteCompanyService,
    private recoveryPasswordByEmail: RecoveryPasswordByEmail,
    private updatePasswordByEmailService: UpdatePasswordByEmailService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Cadastrar uma empresa.',
  })
  async createCompany(@Body() data: CreateCompanyDto) {
    return this.createCompanyService.execute(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todas as empresas.',
  })
  async getAllCompanies(@Query() pageOptionsDto: PageOptionsDto) {
    return this.findAllCompanyService.execute(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar uma empresa por id.',
  })
  async getcompanyById(@Param() { id }: CompanyIdDto) {
    return this.findCompanyById.execute(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar uma empresa por id.',
  })
  async updatecompanyById(
    @Param() { id }: CompanyIdDto,
    @Body() data: UpdateCompanyDto,
  ) {
    return this.updateCompanyService.execute(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir uma empresa por id.',
  })
  async deleteCompanyById(@Param() { id }: CompanyIdDto) {
    return this.deleteCompanyService.execute(id);
  }

  // @Patch('recovery-password')
  // @ApiOperation({
  //   summary: 'Send email to recovery password.',
  // })
  // async recoveryPasswordSendEmail(
  //   @Body() { email }: EmailDto,
  //   @Res() res: Response,
  // ) {
  //   const { status, data } = await this.recoveryPasswordByEmail.execute(email);

  //   return res.status(status).send(data);
  // }

  // @Patch('update_password')
  // @ApiOperation({
  //   summary: 'User update password.',
  // })
  // updatePassword(@Body() updatePassword: CreatePasswordHashDto) {
  //   return this.updatePasswordByEmailService.execute(updatePassword);
  // }
}
