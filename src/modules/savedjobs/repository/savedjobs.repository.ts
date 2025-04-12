import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SavedJobsEntity } from "src/database/entities/savedjobs.entity";
import { PageDto, PageMetaDto, PageOptionsDto } from "src/shared/pagination";
import { Repository } from "typeorm";
import { GetAllSavedJobsDto } from "../dtos/get-all-savedjobs.dto";

@Injectable()
export class SavedJobsRepository {
  constructor(
    @InjectRepository(SavedJobsEntity)
    private readonly savedJobsRepository: Repository<SavedJobsEntity>,
  ) {}

  async getAllSavedJobs(
    pageOptionsDto: PageOptionsDto,
    filters: GetAllSavedJobsDto,
  ): Promise<PageDto<SavedJobsEntity>> {
    try {
      const queryBuilder = this.savedJobsRepository
        .createQueryBuilder('savedJob')
        .leftJoinAndSelect('savedJob.user', 'user')
        .orderBy('savedJob.savedAt', pageOptionsDto.order)
        .skip((pageOptionsDto.page - 1) * pageOptionsDto.take)
        .take(pageOptionsDto.take);

      if (filters.userId) {
        queryBuilder.andWhere('user.id = :userId', { userId: filters.userId });
      }

      if (filters.jobId) {
        queryBuilder.andWhere('savedJob.jobId = :jobId', { jobId: filters.jobId });
      }

      const [savedJobs, itemCount] = await queryBuilder.getManyAndCount();

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      return new PageDto(savedJobs, pageMetaDto);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar vagas salvas');
    }
  }
}