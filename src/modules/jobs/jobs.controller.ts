import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { ArchiveJobSwagger } from 'src/shared/Swagger/decorators/jobs/archive-job.swagger';
import { CreateNewJobSwagger } from 'src/shared/Swagger/decorators/jobs/create-new-job.swagger';
import { GetOneJobSwagger } from 'src/shared/Swagger/decorators/jobs/get-one-job.swagger';
import { SearchJobSwagger } from 'src/shared/Swagger/decorators/jobs/search-job.swagger';
import { UpdateJobSwagger } from 'src/shared/Swagger/decorators/jobs/update-job.swagger';
import { CompaniesEntity } from '../../database/entities/companies.entity';
import { PageOptionsDto } from '../../shared/pagination';
import { LoggedCompany } from '../auth/decorator/logged-company.decorator';
import { CreateJobDto } from './dtos/create-job.dto';
import { GetAllJobsDto } from './dtos/get-all-jobs.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import {
  CreateJobService,
  GetAllJobsService,
  GetOneJobByIdService,
  UpdateJobService,
} from './services';
import { SearchJobsService } from './services/search-job.service';
import { GetAllJobsSwagger } from 'src/shared/Swagger/decorators/jobs/get-all-jobs-of-logged-company.swagger';
import { GetAllJobsFromLoggedCompanyService } from './services/get-all-jobs-from-logged-company.service';
import { Response } from 'express';
import { DeleteJobService } from './services/delete-job.service';

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
    private getAllJobsFromLoggedCompany: GetAllJobsFromLoggedCompanyService,
  ) {}

  @Post()
  @CreateNewJobSwagger()
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
  @GetAllJobsSwagger()
  @ApiResponse({
    status: 200,
    description: 'Lista de vagas retornadas com sucesso.',
    schema: {
      example: {
        items: [
          {
            id: 'uuid',
            title: 'Desenvolvedor(a) Backend',
            status: 'ACTIVE',
          },
        ],
        meta: {
          itemCount: 1,
          totalItems: 1,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  async getAllJobs(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() params: GetAllJobsDto,
  ) {
    return this.getAllJobsService.execute(pageOptionsDto, params);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('loggedCompanyJobs')
  async getAllLoggedCompanyJobs(
    @LoggedCompany() company: CompaniesEntity,
    @Res() res: Response,
  ) {
    const { status, data } = await this.getAllJobsFromLoggedCompany.execute(
      company.id,
    );
    return res.status(status).json(data);
  }

  @Get(':id')
  @GetOneJobSwagger()
  async getOneJob(@Param('id') id: string) {
    return this.getOneJobByIdService.execute(id);
  }

  @Put(':id')
  @UpdateJobSwagger()
  async updateJob(@Param('id') id: string, @Body() data: UpdateJobDto) {
    return this.updateJobService.execute(id, data);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ArchiveJobSwagger()
  async archivedJob(
    @Param()
    jobId: string,
    @Body('content') content: string,
  ) {
    return this.deleteJobService.execute(jobId, content);
  }

  @Post('/search/:keyword')
  @SearchJobSwagger()
  async searchJobs(
    @Query() pageOptionsDto: PageOptionsDto,
    @Body() data: GetAllJobsDto,
    @Param('keyword') keyword?: string,
  ): Promise<any> {
    keyword = keyword || ' ';
    return this.searchJobsService.execute(keyword, pageOptionsDto, data);
  }
}
