import { Injectable } from '@nestjs/common';
import { AlertsRepository } from '../repository/alerts.repository'; // Lembre-se de ajustar o caminho correto
import { AlertEntity } from '../../../database/entities/alert.entity'; // Lembre-se de ajustar o caminho correto
import { JobsEntity } from 'src/database/entities/jobs.entity';
import axios from 'axios';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AlertsService {
  constructor(
    private readonly alertsRepository: AlertsRepository,
    private readonly mailerService: MailerService,
  ) {}

  async getUserEmailByAlertId(alertId: string): Promise<string | null> {
    const alerts = await this.alertsRepository.findAlertsByUserId(alertId);
    if (alerts && alerts.length > 0) {
      const alert = alerts[0];
      if (alert.user) {
        return alert.user.email;
      }
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
      const userEmail = alert.user.email;
      await this.sendEmail(userEmail, jobs);
    }
  }

  private async findJobs(
    keyword: string,
    location: string,
  ): Promise<JobsEntity[]> {
    const response = await axios.get(
      `/jobs?keyword=${keyword}&location=${location}`,
    );
    return response.data;
  }

  private async sendEmail(email: string, jobs: JobsEntity[]): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Vagas Relevantes para Você',
      template: './vagas',
      context: {
        jobs,
      },
    });
  }
}
