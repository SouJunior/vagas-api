import { BadRequestException, Injectable } from '@nestjs/common';
import { ReportIdDto } from '../dtos/get-report-by-id.dto';
import { ReportRepository } from '../repository/reports.repository';

@Injectable()
export class DeleteReportService {
  constructor(private reportRepository: ReportRepository) {}

  async execute({ id }: ReportIdDto) {
    const reportExists = await this.reportRepository.findReportById(+id);

    if (!reportExists) {
      throw new BadRequestException('Report not found');
    }

    return this.reportRepository.deleteReportById(+id);
  }
}
