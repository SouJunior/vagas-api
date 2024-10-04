import { Injectable, NotFoundException } from '@nestjs/common';
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
    this.configureCronJob();
  }

  private configureCronJob() {
    Cron.schedule(
      '49 15 * * *',
      () => {
        this.sendEmailsDaily();
      },
      {
        scheduled: true,
        timezone: 'America/Sao_Paulo',
      },
    );
  }

  async getUserEmailByAlertId(alertId: string): Promise<string> {
    const alert = await this.alertsRepository.findAlertById(alertId);
    if (!alert) throw new NotFoundException('Alert not found');

    return alert.user.email;
  }

  async createAlert(data: Partial<AlertEntity>): Promise<AlertEntity> {
    return this.alertsRepository.createAlert(data);
  }

  async sendEmailsDaily() {
    const alerts = await this.alertsRepository.findAll();

    await Promise.all(
      alerts.map(async (alert) => {
        const jobs = await this.findJobs(alert.keyword, alert.location);
        const userEmail = await this.getUserEmailByAlertId(alert.id);

        await this.sendEmail(userEmail, jobs);
      }),
    );
  }

  private async findJobs(
    keyword: string,
    location: string,
  ): Promise<JobsEntity[]> {
    try {
      const response = await axios.get(
        `${process.env.VACANCIES_URL}/job?keyword=${keyword}&location=${location}`,
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching jobs for keyword: ${keyword}, location: ${location}`,
        error,
      );
      return [];
    }
  }

  private async sendEmail(email: string, jobs: JobsEntity[]): Promise<void> {
    await this.mailerService.sendJobAlerts(email, jobs);
  }
}
