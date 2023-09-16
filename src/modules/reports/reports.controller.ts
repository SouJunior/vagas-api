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
import { CreateReportSwagger } from 'src/shared/Swagger/decorators/reports/create-report.swagger';
import { GetAllReportsSwagger } from 'src/shared/Swagger/decorators/reports/get-all-reports.swagger';
import { GetReportByIdSwagger } from 'src/shared/Swagger/decorators/reports/get-report-by-id.swagger';
import { UpdateReportSwagger } from 'src/shared/Swagger/decorators/reports/update-report.swagger';
import { DeleteReportSwagger } from 'src/shared/Swagger/decorators/reports/delete-report.swagger';

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
  @CreateReportSwagger()
  async create(@Body() data: CreateReportDto) {
    return this.createReportService.execute(data);
  }

  @Get()
  @GetAllReportsSwagger()
  async getAllReports() {
    return this.findAllReportsService.execute();
  }

  @Get(':id')
  @GetReportByIdSwagger()
  async getReportById(@Param() data: ReportIdDto) {
    return this.findReportByIdService.execute(data);
  }

  @Put(':id')
  @UpdateReportSwagger()
  async updateReport(
    @Param() reportId: ReportIdDto,
    @Body() data: UpdateReportDto,
  ) {
    return this.updateReportService.execute(reportId, data);
  }

  @Delete(':id')
  @DeleteReportSwagger()
  async deleteReport(@Param() data: ReportIdDto) {
    return this.deleteReportService.execute(data);
  }
}
