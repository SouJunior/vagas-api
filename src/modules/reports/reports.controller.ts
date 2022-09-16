import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Put(':id')
  async updateReport(
    @Param() reportId: ReportIdDto,
    @Body() data: UpdateReportDto,
  ) {
    return this.updateReportService.execute(reportId, data);
  }

  @Delete(':id')
  async deleteReport(@Param() data: ReportIdDto) {
    return this.deleteReportService.execute(data);
  }
}
