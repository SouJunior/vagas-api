import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SavedJobEntity } from "src/database/entities/saved-job.entity";
import { Repository } from "typeorm";

@Injectable()
export class SavedJobsRepository {
    constructor(@InjectRepository(SavedJobEntity) private usersRepository: Repository<SavedJobEntity>) {}
}