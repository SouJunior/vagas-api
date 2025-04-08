import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedJobsEntity } from '../../../database/entities/savedjobs.entity';
import { CreateSavedJobDto } from '../dtos/create-savedJob-dto';
import { UsersEntity } from '../../../database/entities/users.entity';
import { JobsEntity } from '../../../database/entities/jobs.entity';

@Injectable()
export class SavedJobsService {
  constructor(
    @InjectRepository(SavedJobsEntity)
    private savedJobsRepository: Repository<SavedJobsEntity>,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(JobsEntity)
    private jobsRepository: Repository<JobsEntity>,
  ) {}

  async saveJob(
    createSavedJobDto: CreateSavedJobDto,
  ): Promise<SavedJobsEntity> {
    const { userId, jobId } = createSavedJobDto;

    if (!userId || !jobId) {
      throw new BadRequestException('User ID and Job ID must be provided');
    }

    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const job = await this.jobsRepository.findOneBy({ id: jobId });
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    const newSavedJob = this.savedJobsRepository.create({
      user,
      jobId,
      savedAt: new Date(),
    });
    return this.savedJobsRepository.save(newSavedJob);
  }

}
