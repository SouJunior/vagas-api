import { ReportEntity } from 'src/database/entities/report.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ReportEntity)
export class ReportRepository extends Repository<any> {
  async createReport(data: any): Promise<ReportEntity> {
    return this.create(data);
  }
}
