import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AlertEntity } from '../../../database/entities/alert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { handleError } from '../../../shared/utils/handle-error.util';

@Injectable()
export class AlertsRepository {
  constructor(
    @InjectRepository(AlertEntity)
    private alertsRepository: Repository<AlertEntity>,
  ) {}

  async createAlert(data: Partial<AlertEntity>): Promise<AlertEntity> {
    return this.alertsRepository.save(data).catch(handleError);
  }

  async findAlertById(alertId: string): Promise<AlertEntity> {
    return this.alertsRepository
      .findOne({
        where: { id: alertId },
        relations: ['user'],
      })
      .catch(handleError);
  }

  async findAll(): Promise<AlertEntity[]> {
    return this.alertsRepository.find().catch(handleError);
  }
}
