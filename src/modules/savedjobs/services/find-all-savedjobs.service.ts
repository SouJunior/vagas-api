import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SavedJobsEntity } from "src/database/entities/savedjobs.entity";
import { PageDto, PageOptionsDto } from "src/shared/pagination";
import { SavedJobsRepository } from "../repository/savedjobs.repository";
import { GetAllSavedJobsDto } from "../dtos/get-all-savedjobs.dto";

@Injectable()
export class FindAllSavedJobsService {
  constructor(private readonly savedJobsRepository: SavedJobsRepository) {}

  async getAllSavedJobs(
    pageOptionsDto: PageOptionsDto,
    filters: GetAllSavedJobsDto,
  ): Promise<PageDto<SavedJobsEntity>> {
    try {
      return await this.savedJobsRepository.getAllSavedJobs(pageOptionsDto, filters);
    } catch (error) {
      throw new InternalServerErrorException(`Falha ao salvar os trabalhos salvos: ${error.message}`);
    }
  }
}