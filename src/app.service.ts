import { Injectable } from '@nestjs/common';
import { MailService } from './modules/mails/mail.service';
import { UserRepository } from './modules/user/repository/user.repository';
import { PageOptionsDto, Order } from './shared/pagination';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ApplicationEntity,
  ApplicationStatus,
} from './database/entities/applications.entity';
import { Repository } from 'typeorm';
import { CustomBadRequestException } from './modules/applications/exceptions/bad-request.exception';

@Injectable()
export class AppService {
  constructor(
    private mailService: MailService,
    private userRepository: UserRepository,
    @InjectRepository(ApplicationEntity)
    private applicationRepository: Repository<ApplicationEntity>,
  ) {}

  getAppStatus(baseUrl: string) {
    return `<div style=text-align:center><a target="_blank" href="https://www.linkedin.com/company/soujunior/"><svg font-family="Times New Roman" font-size="16" height="299.96" viewBox="0 0 854 300" width="854.56" xmlns="http://www.w3.org/2000/svg" style="width:854.56px; height:299.96px; font-family:'Times New Roman'; font-size:16px; position:relative; z-index:1" xmlns:xlink="http://www.w3.org/1999/xlink"><style>.text {font-size: 90px;font-weight: 700;font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;}.desc {font-size: 20px;font-weight: 500;font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;}.text, .desc {animation: fadeIn 1.2s ease-in-out forwards;}@keyframes fadeIn { from {opacity: 0; } to {opacity: 1; }};</style><g transform="translate(427, 150) scale(1, 1) translate(-427, -150)"><path d="" fill="#2088f2" opacity="0.4"><animate attributeName="d" begin="0s" calcmod="spline" dur="20s" keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1" keyTimes="0;0.333;0.667;1" repeatCount="indefinite" values="M0 0L 0 220Q 213.5 260 427 230T 854 255L 854 0 Z;M0 0L 0 245Q 213.5 260 427 240T 854 230L 854 0 Z;M0 0L 0 265Q 213.5 235 427 265T 854 230L 854 0 Z;M0 0L 0 220Q 213.5 260 427 230T 854 255L 854 0 Z" /></path><path d="" fill="#2088f2" opacity="0.4"><animate attributeName="d" begin="-10s" calcmod="spline" dur="20s" keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1" keyTimes="0;0.333;0.667;1" repeatCount="indefinite" values="M0 0L 0 235Q 213.5 280 427 250T 854 260L 854 0 Z;M0 0L 0 250Q 213.5 220 427 220T 854 240L 854 0 Z;M0 0L 0 245Q 213.5 225 427 250T 854 265L 854 0 Z;M0 0L 0 235Q 213.5 280 427 250T 854 260L 854 0 Z" /></path></g><text alignment-baseline="middle" class="text" stroke="#none" stroke-width="1" text-anchor="middle" x="50%" y="38%" style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'; font-size:90px; font-weight:700; alignment-baseline:middle; fill:#ffffff; stroke-width:1; text-anchor:middle">Sou Junior</text><text alignment-baseline="middle" class="desc" text-anchor="middle" x="52%" y="61%" style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'; font-size:20px; font-weight:500; alignment-baseline:middle; fill:#ffffff; text-anchor:middle">Projeto Opensource para melhorar o match entre os profissionais Juniors e Empresas!</text></svg></a></div>`;
  }

  async getHealthCheck() {
    const databaseStatus = await this.checkDatabase();
    const mailerStatus = await this.checkEmail();
    const data = {
      databaseStatus,
      mailerStatus,
    };
    return {
      status: 201,
      data,
    };
  }

  private async checkDatabase() {
    try {
      const options: PageOptionsDto = {
        page: 1,
        take: 10,
        orderByColumn: 'id',
        order: Order.ASC,
      };
      const allUsers = await this.userRepository.getAllUsers(options);
      if (allUsers == null || allUsers == undefined) {
        return 'DOWN';
      }
      return 'OK';
    } catch (error) {
      return 'DOWN';
    }
  }

  private async checkEmail() {
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
      return 'OK';
    } catch (error) {
      return 'DOWN';
    }
  }

  async updateStatus(
    user_id: string,
    applicationId: string,
    status: string,
  ): Promise<ApplicationEntity | null> {
    const application = await this.applicationRepository.findOne({
      where: { id: applicationId, user_id },
    });

    if (!application) {
      return null;
    }

    const validStatus = Object.values(ApplicationStatus).includes(
      status as ApplicationStatus,
    );
    if (!validStatus) {
      throw new CustomBadRequestException('Status inválido');
    }

    application.status = status as ApplicationStatus;
    await this.applicationRepository.save(application);
    return application;
  }
}
