import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedJobsEntity } from '../../../database/entities/savedjobs.entity';
import { CreateSavedJobDto } from '../dtos/create-savedJob-dto';
import { UsersEntity } from '../../../database/entities/users.entity';

@Injectable()
export class SavedJobsService {
  constructor(
    @InjectRepository(SavedJobsEntity)
    private savedJobsRepository: Repository<SavedJobsEntity>,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async saveJob(createSavedJobDto: CreateSavedJobDto): Promise<SavedJobsEntity> {
    const user = await this.usersRepository.findOneBy({ id: createSavedJobDto.userId });
    const newSavedJob = this.savedJobsRepository.create({
      user,
      jobId: createSavedJobDto.jobId,
      savedAt: new Date(),
    });
    return this.savedJobsRepository.save(newSavedJob);
  }
}