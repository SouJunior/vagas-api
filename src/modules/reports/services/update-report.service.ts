import { UpdateReportDto } from './../dtos/update-report.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ReportRepository } from '../repository/reports.repository';
import { ReportIdDto } from '../dtos/get-report-by-id.dto';

@Injectable()
export class UpdateReportService {
  constructor(private reportRepository: ReportRepository) {}

  async execute({ id }: ReportIdDto, data: UpdateReportDto) {
    const reportExists = await this.reportRepository.findReportById(+id);

    if (!reportExists) {
      throw new BadRequestException('Report not found');
    }

    return this.reportRepository.updateReport(+id, data);
  }
}
