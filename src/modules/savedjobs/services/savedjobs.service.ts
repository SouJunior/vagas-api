import { BadRequestException, Injectable } from '@nestjs/common';
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
    private readonly savedJobsRepository: Repository<SavedJobsEntity>,

    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,

    @InjectRepository(JobsEntity)
    private readonly jobsRepository: Repository<JobsEntity>,
  ) {}

  async saveJob(
    createSavedJobDto: CreateSavedJobDto,
  ): Promise<SavedJobsEntity> {
    const { userId, jobId } = createSavedJobDto;

    const userExists = await this.usersRepository.exist({
      where: { id: userId },
    });
    if (!userExists) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    const jobExists = await this.jobsRepository.exist({ where: { id: jobId } });
    if (!jobExists) {
      throw new BadRequestException('Vaga não encontrada.');
    }

    const alreadySaved = await this.savedJobsRepository.exist({
      where: {
        user: { id: userId },
        job: { id: jobId },
      },
    });

    if (alreadySaved) {
      throw new BadRequestException('Esta vaga já foi salva por este usuário.');
    }

    const user = await this.usersRepository.findOneBy({ id: userId });
    const job = await this.jobsRepository.findOneBy({ id: jobId });

    const savedAt = new Date();
    const expiresAt = new Date(savedAt);
    expiresAt.setDate(savedAt.getDate() + 7);

    const newSavedJob = this.savedJobsRepository.create({
      user,
      job,
      savedAt,
      expiresAt,
    });

    const savedJob = await this.savedJobsRepository.save(newSavedJob);

    return this.savedJobsRepository.findOne({
      where: { id: savedJob.id },
      relations: ['user', 'job'],
    });
  }
}
