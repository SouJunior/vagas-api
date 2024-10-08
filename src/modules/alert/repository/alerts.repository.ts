import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AlertEntity } from '../../../database/entities/alert.entity';


@Injectable()
export class AlertsRepository {
  constructor(
    @InjectRepository(AlertEntity)
    private alertsRepository: Repository<AlertEntity>,
  ) {}

  async createAlert(data: Partial<AlertEntity>): Promise<AlertEntity> {
    return this.alertsRepository.save(data);
  }

  async findAlertsByUserId(userId: string): Promise<AlertEntity[]> {
    return this.alertsRepository.find({ where: { user: { id: userId } } });
  }

  
}
