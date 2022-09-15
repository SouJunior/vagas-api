import { Body, Controller, Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { CreateReportService } from './services';

@Controller('report')
export class ReportsController {
  constructor(private createReportService: CreateReportService) {}

  @Post('/create')
  async create(@Body() data: CreateReportDto) {
    return this.createReportService.execute(data);
  }
}
