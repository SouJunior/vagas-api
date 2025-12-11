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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
import { GetAllJobsOfLoggedCompanySwagger } from 'src/shared/Swagger/decorators/jobs/get-all-jobs-of-logged-company.swagger';
import { GetAllJobsSwagger } from 'src/shared/Swagger/decorators/jobs/get-all-jobs-of-logged-company.swagger copy';
import { GetAllJobsFromLoggedCompanyService } from './services/get-all-jobs-from-logged-company.service';
import { Response } from 'express';
import { DeleteJobService } from './services/delete-job.service';
import { CreateJobDraftDto } from './dtos/create-job-draft.dto';
import { CreateJobDraftService } from './services/create-job-draft.service';
import { PublishJobService } from './services/publish-job.service';
import { CompleteJobDto } from './dtos/complete-job.dto';
import { JobOwnerGuard } from './guards/job-owner.guard';
import { CancelJobService } from './services/cancel-job.service';
import { DeleteJobDraftService } from './services/delete-job-draft.service';
import { DeleteJobDraftSwagger } from 'src/shared/Swagger/decorators/jobs/delete-job-draft.swagger';
import { CreateJobDraftSwagger } from 'src/shared/Swagger/decorators/jobs/create-job-draft.swagger';
import { PublishJobSwagger } from 'src/shared/Swagger/decorators/jobs/publish-job.swagger';
import { CancelJobSwagger } from 'src/shared/Swagger/decorators/jobs/cancel-job.swagger';

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
    private createJobDraftService: CreateJobDraftService,
    private publishJobService: PublishJobService,
    private cancelJobService: CancelJobService,
    private deleteJobDraftService: DeleteJobDraftService,
  ) {}

  @Post('draft')
  @CreateJobDraftSwagger()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async createJobDraft(
    @Body() data: CreateJobDraftDto,
    @LoggedCompany() company: CompaniesEntity,
  ) {
    return this.createJobDraftService.execute(data, company);
  }

  @Patch(':id/publish')
  @PublishJobSwagger()
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), JobOwnerGuard)
  async publishJob(
    @Param('id') id: string,
    @Body() completeData: CompleteJobDto,
  ) {
    return this.publishJobService.execute(id, completeData);
  }

  @Patch(':id/cancel')
  @CancelJobSwagger()
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), JobOwnerGuard)
  async cancelJob(@Param('id') id: string) {
    return this.cancelJobService.execute(id);
  }

  @Delete(':id')
  @DeleteJobDraftSwagger()
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), JobOwnerGuard)
  async deleteJobDraft(@Param('id') id: string) {
    return this.deleteJobDraftService.execute(id);
  }

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
  async archivedJob(@Param() jobId: string, @Body('content') content: string) {
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
