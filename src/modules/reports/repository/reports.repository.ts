import { ReportEntity } from '../../../database/entities/report.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateReportDto } from '../dtos/create-report.dto';
import { UpdateReportDto } from '../dtos/update-report.dto';
import { ReportParamsType } from '../types/find-by-params.type';
import { handleError } from 'src/shared/utils/handle-error.util';

@EntityRepository(ReportEntity)
export class ReportRepository extends Repository<ReportEntity> {
  async createReport(data: CreateReportDto): Promise<ReportEntity> {
    return this.save(data).catch(handleError);
  }

  async findByParams(params: ReportParamsType): Promise<ReportEntity> {
    return this.findOne(params).catch(handleError);
  }

  async findAllRepots(): Promise<ReportEntity[]> {
    return this.find().catch(handleError);
  }

  async findReportById(id: number): Promise<ReportEntity> {
    return this.findOne(id).catch(handleError);
  }

  async updateReport(id: number, data: UpdateReportDto) {
    const report = await this.findOne(id).catch(handleError);

    return this.save({
      ...report,
      ...data,
    }).catch(handleError);
  }

  async deleteReportById(id: number): Promise<object> {
    await this.delete(id).catch(handleError);

    return {
      message: 'Deleted Report successfully',
    };
  }
}
