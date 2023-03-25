import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiExcludeController, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportIdDto } from './dtos/get-report-by-id.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import {
  CreateReportService,
  DeleteReportService,
  FindAllReportsService,
  FindReportByIdService,
  UpdateReportService,
} from './services';

@ApiExcludeController()
@ApiTags('Report')
@Controller('report')
export class ReportsController {
  constructor(
    private createReportService: CreateReportService,
    private findAllReportsService: FindAllReportsService,
    private findReportByIdService: FindReportByIdService,
    private deleteReportService: DeleteReportService,
    private updateReportService: UpdateReportService,
  ) {}

  @Post('')
  @ApiOperation({
    summary: 'Criar um relatório.',
  })
  async create(@Body() data: CreateReportDto) {
    return this.createReportService.execute(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Encontrar todos os relatórios.',
  })
  async getAllReports() {
    return this.findAllReportsService.execute();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Encontrar um relatório por id.',
  })
  async getReportById(@Param() data: ReportIdDto) {
    return this.findReportByIdService.execute(data);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar um relatório por id.',
  })
  async updateReport(
    @Param() reportId: ReportIdDto,
    @Body() data: UpdateReportDto,
  ) {
    return this.updateReportService.execute(reportId, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir um relatório por id.',
  })
  async deleteReport(@Param() data: ReportIdDto) {
    return this.deleteReportService.execute(data);
  }
}
