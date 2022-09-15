import { Body, Controller, Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';

@Controller('report')
export class ReportsController {
  @Post('/create')
  async create(@Body() data: CreateReportDto) {
    return data;
  }
}
