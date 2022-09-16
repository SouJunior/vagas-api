import { Injectable } from '@nestjs/common';
import { ReportRepository } from '../repository/reports.repository';

@Injectable()
export class FindAllReportsService {
  constructor(private reportRepository: ReportRepository) {}

  async execute() {
    const reports = await this.reportRepository.findAllRepots();

    if (reports.length <= 0) {
      return 'Reports is empty';
    }

    return reports;
  }
}
