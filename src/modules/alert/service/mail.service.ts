import { Injectable } from '@nestjs/common';
import { MailService as ExternalMailService } from './mail.service';
import { ApplicationStatus } from 'src/database/entities/enums/application-status.enum';

@Injectable()
export class MailService {
  constructor(private mailService: ExternalMailService) {}

  async checkEmail(): Promise<ApplicationStatus> { 
    try {
      await this.mailService.sendMail({
        subject: 'HealthCheck',
        template: './health',
        context: {
          arg1: 'Argumento1',
          arg2: 'Argumento2',
        },
        email: 'carteiro@soujunior.tech',
      });
      return ApplicationStatus.PENDING; 
    } catch (error) {
      return ApplicationStatus.REJECTED; 
    }
  }
    sendMail(arg0: { subject: string; template: string; context: { arg1: string; arg2: string; }; email: string; }) {
        throw new Error('Method not implemented.');
    }
}
