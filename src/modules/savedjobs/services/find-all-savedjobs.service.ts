import { Injectable } from "@nestjs/common";
import { SavedJobsEntity } from "src/database/entities/savedjobs.entity";
import { PageDto, PageOptionsDto } from "src/shared/pagination";
import { SavedJobsRepository } from "../repository/savedjobs.repository";
import { GetAllSavedJobsDto } from "../dtos/get-all-savedjobs.dto";

@Injectable()
export class FindAllSavedJobsService {
  constructor(private readonly savedJobsRepository: SavedJobsRepository) {}

  async execute(
    pageOptionsDto: PageOptionsDto,
    filters: GetAllSavedJobsDto,
  ): Promise<PageDto<SavedJobsEntity>> {
    return this.savedJobsRepository.getAllSavedJobs(pageOptionsDto, filters);
  }
}