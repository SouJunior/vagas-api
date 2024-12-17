import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationEntity, ApplicationStatus } from 'src/database/entities/applications.entity';

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
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private applicationRepository: Repository<ApplicationEntity>,
  ) {}

  async findOne(applicationId: string, userId: string): Promise<ApplicationEntity> {
    const application = await this.applicationRepository.findOne({
      where: { id: applicationId, user_id: userId },
    });

    if (!application) {
      throw new ApplicationNotFoundException();
    }

    return application;
  }

  async updateStatus(application: ApplicationEntity, status: string) {
    const validStatus = Object.values(ApplicationStatus).includes(status as ApplicationStatus);
    if (!validStatus) {
      throw new InvalidStatusException();
    }

    application.status = status as ApplicationStatus;
    return this.applicationRepository.save(application);
  }
}
