import { Repository } from 'typeorm';
import { ApplicationEntity } from '../../../database/entities/applications.entity';
import { handleError } from '../../../shared/utils/handle-error.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DataApplicationDto } from '../dtos/data-application.dto';

@Injectable()
export class ApplicationsRepository {
  constructor(
    @InjectRepository(ApplicationEntity)
    private applicationsRepository: Repository<ApplicationEntity>,
  ) {}

  async saveApplication(data: DataApplicationDto): Promise<ApplicationEntity> {
    return this.applicationsRepository.save(data).catch(handleError);
  }
}
