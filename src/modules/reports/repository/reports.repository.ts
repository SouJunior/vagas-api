import { ReportsEntity } from '../../../database/entities/reports.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from '../dtos/create-report.dto';
import { UpdateReportDto } from '../dtos/update-report.dto';
import { ReportParamsType } from '../types/find-by-params.type';
import { handleError } from '../../../shared/utils/handle-error.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ReportRepository {
  constructor(
    @InjectRepository(ReportsEntity)
    private reportsRepository: Repository<ReportsEntity>,
  ) {}

  async createReport(data: CreateReportDto): Promise<ReportsEntity> {
    return this.reportsRepository.save(data).catch(handleError);
  }

  async findByParams(params: ReportParamsType): Promise<ReportsEntity | null> {
    const { job_id, user_id } = params;
    return this.reportsRepository
      .findOneBy({ job_id, user_id })
      .catch(handleError);
  }

  async findAllReports(): Promise<ReportsEntity[]> {
    return this.reportsRepository.find().catch(handleError);
  }

  async findReportById(id: string): Promise<ReportsEntity | null> {
    return this.reportsRepository.findOneBy({ id }).catch(handleError);
  }

  async updateReport(id: string, data: UpdateReportDto) {
    const report = await this.reportsRepository
      .findOneBy({ id })
      .catch(handleError);

    if (!report) {
      throw new NotFoundException('Relatório não encontrado');
    }

    this.reportsRepository.merge(report, data);
    return this.reportsRepository.save(report).catch(handleError);
  }

  async deleteReportById(id: string): Promise<object> {
    await this.reportsRepository.delete(id).catch(handleError);

    return {
      message: 'Deleted Report successfully',
    };
  }
}
