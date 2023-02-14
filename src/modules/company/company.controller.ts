import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CompanyEntity } from 'src/database/entities/company.entity';
import GetEntity from 'src/shared/pipes/pipe-entity.pipe';
import { PageOptionsDto } from '../../shared/pagination';
import { CompanyIdDto } from './dtos/company-id.dto';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.sto';
import {
  CreateCompanyService,
  DeleteCompanyService,
  FindAllCompanyService,
  UpdateCompanyService,
} from './services';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(
    private createCompanyService: CreateCompanyService,
    private findAllCompanyService: FindAllCompanyService,
    private updateCompanyService: UpdateCompanyService,
    private deleteCompanyService: DeleteCompanyService,
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
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @ApiOperation({
    summary: 'Buscar uma empresa por id.',
  })
  async getcompanyById(
    @Param('id', new GetEntity(CompanyEntity))
    company: CompanyEntity,
  ) {
    return company;
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @ApiOperation({
    summary: 'Atualizar uma empresa por id.',
  })
  async updatecompanyById(
    @Param('id', new GetEntity(CompanyEntity))
    company: CompanyEntity,
    @Body() data: UpdateCompanyDto,
  ) {
    return this.updateCompanyService.execute(company, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir uma empresa por id.',
  })
  async deleteCompanyById(@Param() { id }: CompanyIdDto) {
    return this.deleteCompanyService.execute(id);
  }
}
