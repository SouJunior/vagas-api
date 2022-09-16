import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportIdDto } from './dtos/get-report-by-id.dto';
import {
  CreateReportService,
  DeleteReportService,
  FindAllReportsService,
  FindReportByIdService,
} from './services';

@Controller('report')
export class ReportsController {
  constructor(
    private createReportService: CreateReportService,
    private findAllReportsService: FindAllReportsService,
    private findReportByIdService: FindReportByIdService,
    private deleteReportService: DeleteReportService,
  ) {}

  @Post('/create')
  async create(@Body() data: CreateReportDto) {
    return this.createReportService.execute(data);
  }

  @Get()
  async getAllReports() {
    return this.findAllReportsService.execute();
  }

  @Get(':id')
  async getReportById(@Param() data: ReportIdDto) {
    return this.findReportByIdService.execute(data);
  }

  @Delete(':id')
  async deleteReport(@Param() data: ReportIdDto) {
    return this.deleteReportService.execute(data);
  }
}
