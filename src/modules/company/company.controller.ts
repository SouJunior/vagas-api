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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CompaniesEntity } from 'src/database/entities/companies.entity';
import { ActivateCompanySwagger } from 'src/shared/Swagger/decorators/company/activate-company.swagger';
import { CreateCompanySwagger } from 'src/shared/Swagger/decorators/company/create-company.swagger';
import { DeleteCompanyByIdSwagger } from 'src/shared/Swagger/decorators/company/delete-company-by-id.swagger';
import { GetAllCompaniesSwagger } from 'src/shared/Swagger/decorators/company/get-all-companies.swagger';
import { RecoverPasswordByEmailSwagger } from 'src/shared/Swagger/decorators/company/recovery-password-by-email.swagger';
import { UpdateCompanyByIdSwagger } from 'src/shared/Swagger/decorators/company/update-company-by-id.swagger';
import { UpdatePasswordAfterRecoveryEmailSwagger } from 'src/shared/Swagger/decorators/company/update-password-after-recovery-email.swagger';
import { UpdatePasswordSwagger } from 'src/shared/Swagger/decorators/company/update-password.swagger';
import { PageOptionsDto } from '../../shared/pagination';
import { LoggedCompany } from '../auth/decorator/logged-company.decorator';
import { EmailDto } from '../user/dtos/email-user.dto';
import { CompanyIdDto } from './dtos/company-id.dto';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import {
  CreatePasswordHashDto,
  UpdateMyPasswordDto,
} from './dtos/update-my-password.dto';
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

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    private createCompanyService: CreateCompanyService,
    private findAllCompanyService: FindAllCompanyService,
    private updateCompanyService: UpdateCompanyService,
    private deleteCompanyService: DeleteCompanyService,
    private recoveryPasswordByEmail: RecoveryCompanyPasswordByEmail,
    private updatePasswordByEmailService: UpdatePasswordByEmailService,
    private updateCompanyPassword: UpdateCompanyPassword,
    private activateCompanyService: ActivateCompanyService,
  ) {}

  @Post()
  @CreateCompanySwagger()
  async createCompany(
    @Body() createcompany: CreateCompanyDto,
    @Res() res: Response,
  ) {
    const { data, status } =
      await this.createCompanyService.execute(createcompany);

    return res.status(status).send(data);
  }

  @Get()
  @GetAllCompaniesSwagger()
  async getAllCompanies(@Query() pageOptionsDto: PageOptionsDto) {
    return this.findAllCompanyService.execute(pageOptionsDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  @Put('edit')
  @UpdateCompanyByIdSwagger()
  async updatecompanyById(
    @LoggedCompany() company: CompaniesEntity,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFile('file') file,
    @Res() res: Response,
  ) {
    const { data, status } = await this.updateCompanyService.execute(
      company,
      updateCompanyDto,
      file,
    );
    return res.status(status).send(data);
  }

  @Patch('recovery-password')
  @RecoverPasswordByEmailSwagger()
  async recoverPasswordByEmail(
    @Body() { email }: EmailDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.recoveryPasswordByEmail.execute(email);

    return res.status(status).send(data);
  }

  @Patch('update_password_email')
  @UpdatePasswordAfterRecoveryEmailSwagger()
  async updatePasswordByEmail(
    @Body() updatePassword: CreatePasswordHashDto,
    @Res() res: Response,
  ) {
    const { data, status } =
      await this.updatePasswordByEmailService.execute(updatePassword);
    return res.status(status).send(data);
  }

  @Patch('update_password')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @UpdatePasswordSwagger()
  async updatePassword(
    @LoggedCompany() company: CompaniesEntity,
    @Body() updatePassword: UpdateMyPasswordDto,
    @Res() res: Response,
  ) {
    const { data, status } = await this.updateCompanyPassword.execute(
      company,
      updatePassword,
    );
    return res.status(status).send(data);
  }

  @Patch(':id')
  @ActivateCompanySwagger()
  async activateCompany(@Param('id') id: string, @Res() res: Response) {
    const { data, status } = await this.activateCompanyService.execute(id);
    return res.status(status).send(data);
  }

  @Delete(':id')
  @DeleteCompanyByIdSwagger()
  async deleteCompanyById(@Param() { id }: CompanyIdDto, @Res() res: Response) {
    const { data, status } = await this.deleteCompanyService.execute(id);
    return res.status(status).send(data);
  }
}
