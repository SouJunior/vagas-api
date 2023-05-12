import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CompaniesEntity } from '../../database/entities/companies.entity';
import { BadRequestSwagger } from '../../shared/Swagger/bad-request.swagger';
import { UnauthorizedSwagger } from '../../shared/Swagger/unauthorized.swagger';
import { PageOptionsDto } from '../../shared/pagination';
import GetEntity from '../../shared/pipes/pipe-entity.pipe';
import { LoggedCompany } from '../auth/decorator/logged-company.decorator';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import {
  CreateJobService,
  DeleteJobService,
  GetAllJobsService,
  GetOneJobByIdService,
  UpdateJobService,
} from './services';
import { SearchJobsService } from './services/search-job.service';

@ApiTags('Job')
@Controller('job')
export class JobsController {
  constructor(
    private createJobService: CreateJobService,
    private getAllJobsService: GetAllJobsService,
    private getOneJobByIdService: GetOneJobByIdService,
    private updateJobService: UpdateJobService,
    private deleteJobService: DeleteJobService,
    private searchJobsService: SearchJobsService,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Exemplo do retorno de sucesso da rota',
    type: 'Vaga publicada com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Modelo de erro',
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Modelo de erro',
    type: BadRequestSwagger,
  })
  @ApiOperation({
    summary: 'Criar uma vaga!',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Cadastrar uma vaga.',
  })
  async createNewJob(
    @Body() data: CreateJobDto,
    @LoggedCompany() company: CompaniesEntity,
  ) {
    return this.createJobService.execute(data, company);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todas as vagas.',
  })
  async getAllJobs(@Query() pageOptionsDto: PageOptionsDto) {
    return this.getAllJobsService.execute(pageOptionsDto);
  }

  @Get('all/:id')
  @ApiOperation({
    summary: 'Buscar todas as vagas da empresa logada.',
  })
  async getAll(
    @Param('id', new GetEntity(CompaniesEntity, ['jobs']))
    company: CompaniesEntity,
  ) {
    return company.jobs;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar uma vaga pelo id.',
  })
  async getOneJob(@Param('id') id: string) {
    return this.getOneJobByIdService.execute(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizaruma vaga pelo id.',
  })
  async updateJob(@Param('id') id: string, @Body() data: UpdateJobDto) {
    return this.updateJobService.execute(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir uma vaga pelo id.',
  })
  async deleteJob(@Param('id') id: string) {
    return this.deleteJobService.execute(id);
  }

  @Get('/search/:keyword')
  @ApiOperation({
    summary: 'Busca por vaga, pelo nome, empresa ou lugar',
  })
  async searchJobs(
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('keyword') keyword?: string,
    @Query('company_id') company_id?: string,
    @Query('headquarters') headquarters?: string,
  ): Promise<any> {
    keyword = keyword || ' ';
    company_id = company_id || ' ';
    headquarters = headquarters || ' ';
    return this.searchJobsService.execute(
      keyword,
      company_id,
      headquarters,
      pageOptionsDto,
    );
  }
}
