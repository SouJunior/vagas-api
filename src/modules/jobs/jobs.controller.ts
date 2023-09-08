import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { ArchiveJobSwagger } from 'src/shared/Swagger/jobs/archive-job.swagger';
import { CreateNewJobSwagger } from 'src/shared/Swagger/jobs/create-new-job.swagger';
import { GetOneJobSwagger } from 'src/shared/Swagger/jobs/get-one-job.swagger';
import { SearchJobSwagger } from 'src/shared/Swagger/jobs/search-job.swagger';
import { UpdateJobSwagger } from 'src/shared/Swagger/jobs/update-job.swagger';
import { CompaniesEntity } from '../../database/entities/companies.entity';
import { JobsEntity } from '../../database/entities/jobs.entity';
import { PageOptionsDto } from '../../shared/pagination';
import GetEntity from '../../shared/pipes/pipe-entity.pipe';
import { LoggedCompany } from '../auth/decorator/logged-company.decorator';
import { CompanyRepository } from '../company/repository/company-repository';
import { CreateJobDto } from './dtos/create-job.dto';
import { GetAllJobsDto } from './dtos/get-all-jobs.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import {
  CreateJobService,
  DeleteJobService,
  GetAllJobsService,
  GetOneJobByIdService,
  UpdateJobService,
} from './services';
import { SearchJobsService } from './services/search-job.service';
import { GetAllJobsOfLoggedCompanySwagger } from 'src/shared/Swagger/jobs/get-all-jobs-of-logged-company.swagger';
import { GetAllJobsSwagger } from 'src/shared/Swagger/jobs/get-all-jobs-of-logged-company.swagger copy';

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
    private companyRepository: CompanyRepository,
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
  async getAllJobs(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() params: GetAllJobsDto,
  ) {
    return this.getAllJobsService.execute(pageOptionsDto, params);
  }
  @GetAllJobsOfLoggedCompanySwagger()
  @Get('all/:id')
  async getAll(@Param('id') id: string) {
    try {
      const company = await this.companyRepository.findCompanyById(id);
      if (!company) {
        throw new NotFoundException(`Empresa com ID ${id} não encontrado.`);
      }
      return company.jobs;
    } catch (error) {
      console.log(error);
    }
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
  @ArchiveJobSwagger()
  async archivedJob(
    @Param('id', new GetEntity(JobsEntity))
    job: JobsEntity,
    @Body('content') content: string,
  ) {
    return this.deleteJobService.execute(job, content);
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
