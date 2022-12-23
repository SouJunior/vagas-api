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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '../../shared/pagination';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import {
  CreateJobService,
  DeleteJobService,
  GetAllJobsService,
  GetOneJobByIdService,
  UpdateJobService,
} from './services';

@ApiTags('job')
@Controller('job')
export class JobsController {
  constructor(
    private createJobService: CreateJobService,
    private getAllJobsService: GetAllJobsService,
    private getOneJobByIdService: GetOneJobByIdService,
    private updateJobService: UpdateJobService,
    private deleteJobService: DeleteJobService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Cadastrar um emprego.',
  })
  async createNewJob(@Body() data: CreateJobDto) {
    return this.createJobService.execute(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Buscar todos os empregos.',
  })
  async getAllJobs(@Query() pageOptionsDto: PageOptionsDto) {
    return this.getAllJobsService.execute(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar um emprego por id.',
  })
  async getOneJob(@Param('id') id: string) {
    return this.getOneJobByIdService.execute(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar um emprego por id.',
  })
  async updateJob(@Param('id') id: string, @Body() data: UpdateJobDto) {
    return this.updateJobService.execute(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir um emprego por id.',
  })
  async deleteJob(@Param('id') id: string) {
    return this.deleteJobService.execute(id);
  }
}
