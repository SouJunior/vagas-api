import { Injectable } from '@nestjs/common';
import { AlertsRepository } from '../modules/alert/repository/alerts.repository'
import { JobsEntity } from '../database/entities/jobs.entity'
import { MailerService } from '@nestjs-modules/mailer';
import axios from 'axios';

@Injectable()
export class AlertsService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly alertsRepository: AlertsRepository,
    
  ) {}
  
 
  async sendEmailsDaily() {
    const alerts = await this.alertsRepository.findAll();
    for (const alert of alerts) {
      const jobs = await this.findJobs(alert.keyword, alert.location);
      const userEmail = alert.user.email;
      await this.sendEmail(userEmail, jobs);
    }
  }

  private findEmailUser(userId: number) {
    // Simulação de busca de e-mail do usuário
    return 'usuario@example.com';
  }

  private async findJobs(keyword: string, location: string): Promise<JobsEntity[]> {
    // Exemplo de busca simples
    const response = await axios.get(`/jobs?keyword=${keyword}&location=${location}`);
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