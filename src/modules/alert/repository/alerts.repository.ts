import { Injectable } from '@nestjs/common';
import { AlertEntity } from '../../../database/entities/alert.entity';

@Injectable()
export class AlertsRepository {
  private alerts: AlertEntity[] = [];

  async create(alert: AlertEntity): Promise<AlertEntity> {
    const existingAlert = this.alerts.find(a => a.id === alert.id);
    if (existingAlert) {
        
    return existingAlert;
    }
    this.alerts.push(alert);
    return alert;
  }

  async findAll(): Promise<AlertEntity[]> {
    return this.alerts;
  }
}