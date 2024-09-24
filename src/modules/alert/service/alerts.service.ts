import { Injectable } from '@nestjs/common';
import { AlertsRepository } from '../repository/alerts.repository';
import { AlertEntity } from '../../../database/entities/alert.entity';
import { JobsEntity } from 'src/database/entities/jobs.entity';
import axios from 'axios';
import { MailService } from '../../mails/mail.service';
import * as Cron from 'node-cron';

@Injectable()
export class AlertsService {
  constructor(
    private readonly alertsRepository: AlertsRepository,
    private readonly mailerService: MailService,
  ) {
    Cron.schedule(
      '0 12 * * *',
      () => {
        this.sendEmailsDaily();
      },
      {
        scheduled: true,
        timezone: 'America/Sao_Paulo',
      },
    );
  }

  async getUserEmailByAlertId(
    alertId: string,
  ): Promise<{ email: string } | null> {
    const alert = await this.alertsRepository.findAlertById(alertId);
    if (alert) {
      return { email: alert.user.email };
    }

    return null;
  }

  async createAlert(data: Partial<AlertEntity>): Promise<AlertEntity> {
    return this.alertsRepository.createAlert(data);
  }

  async sendEmailsDaily() {
    const alerts = await this.alertsRepository.findAll();
    for (const alert of alerts) {
      const jobs = await this.findJobs(alert.keyword, alert.location);
      const user = await this.getUserEmailByAlertId(alert.id);
      await this.sendEmail(user.email, jobs);
    }
  }

  private async findJobs(
    keyword: string,
    location: string,
  ): Promise<JobsEntity[]> {
    const response = await axios.get(
      `${process.env.VACANCIES_URL}/job?keyword=${keyword}&location=${location}`,
    );
    return response.data;
  }

  private async sendEmail(email: string, jobs: JobsEntity[]): Promise<void> {
    await this.mailerService.sendJobAlerts(email, jobs);
  }
}
