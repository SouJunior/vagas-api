import {
  Injectable,
  InternalServerErrorException,
  HttpException,
  Logger,
} from '@nestjs/common';
const logger = new Logger('FindAllSavedJobsService');
import { SavedJobsEntity } from 'src/database/entities/savedjobs.entity';
import { PageDto, PageOptionsDto } from 'src/shared/pagination';
import { SavedJobsRepository } from '../repository/savedjobs.repository';
import { GetAllSavedJobsDto } from '../dtos/get-all-savedjobs.dto';

@Injectable()
export class FindAllSavedJobsService {
  constructor(private readonly savedJobsRepository: SavedJobsRepository) {}

  async getAllSavedJobs(
    pageOptionsDto: PageOptionsDto,
    filters: GetAllSavedJobsDto,
  ): Promise<PageDto<SavedJobsEntity>> {
    try {
      return await this.savedJobsRepository.getAllSavedJobs(
        pageOptionsDto,
        filters,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      logger.error(
        'Erro inesperado ao buscar vagas salvas',
        error?.stack || error,
      );
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
