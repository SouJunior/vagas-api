import { ReportEntity } from 'src/database/entities/report.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateReportDto } from '../dtos/create-report.dto';

@EntityRepository(ReportEntity)
export class ReportRepository extends Repository<ReportEntity> {
  async createReport(data: CreateReportDto): Promise<ReportEntity> {
    return this.save(data);
  }
}
