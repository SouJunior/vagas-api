import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

class ApplicationNotFoundException extends HttpException {
  constructor() {
    super('Candidatura não encontrada.', HttpStatus.NOT_FOUND);
  }
}

class InvalidStatusException extends HttpException {
  constructor() {
    super('Status inválido.', HttpStatus.BAD_REQUEST);
  }
}

@Injectable()
export class AppService {
  constructor(
    private mailService: MailService,
    private userRepository: UserRepository,
    @InjectRepository(ApplicationEntity)
    private applicationRepository: Repository<ApplicationEntity>,
  ) {}

  async getAppStatus() {
    const databaseStatus = await this.checkDatabase();
    const mailerStatus = await this.checkEmail();
  
    return {
      application: 'Sou Junior',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      status: 'OK',
      uptime: process.uptime(), 
      services: {
        database: databaseStatus,
        mailer: mailerStatus,
      },
      timestamp: new Date().toISOString(),
    };
  }

  async getHealthCheck() {
    const databaseStatus = await this.checkDatabase();
    const mailerStatus = await this.checkEmail();
  
    return {
      status: 200,
      data: {
        databaseStatus,
        mailerStatus,
      },
    };
  }

  private async checkDatabase(): Promise<ApplicationStatus> { 
    try {
      const options: PageOptionsDto = {
        page: 1,
        take: 1, 
        orderByColumn: 'id',
        order: Order.ASC,
      };
      const allUsers = await this.userRepository.getAllUsers(options);
      return allUsers.length > 0 ? ApplicationStatus.PENDING : ApplicationStatus.REJECTED;
    } catch (error) {
      return ApplicationStatus.REJECTED; 
    }
  }

  private async checkEmail(): Promise<ApplicationStatus> { 
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

  async updateStatus(
    user_id: string,
    applicationId: string,
    status: string,
  ): Promise<ApplicationEntity | null> {
    const user = await this.userRepository.findOne(user_id);
    
    if (user === undefined || user === null) {
      throw new CustomBadRequestException('User ID inválido.');
    }

    const application = await this.applicationRepository.findOne({
      where: { id: applicationId, user_id },
    });

    if (!application) {
      throw new ApplicationNotFoundException();
    }

    const validStatus = Object.values(ApplicationStatus).includes(
      status as ApplicationStatus,
    );
    if (!validStatus) {
      throw new InvalidStatusException();
    }

    application.status = status as ApplicationStatus;
    await this.applicationRepository.save(application);
    return application;
  }
}
