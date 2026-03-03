import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DeleteSavedJobDto } from '../dtos/delete-saved-job-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedJobsEntity } from '../../../database/entities/savedjobs.entity';

@Injectable()
export class DeleteSavedJobsService {
  constructor(
    @InjectRepository(SavedJobsEntity)
    private readonly savedJobsRepository: Repository<SavedJobsEntity>,
  ) {}

  async execute(deleteSavedJobDto: DeleteSavedJobDto, userId: string) {
    const { id } = deleteSavedJobDto;

    const savedJob = await this.savedJobsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!savedJob) {
      throw new NotFoundException();
    }

    if (savedJob.user.id !== userId) {
      throw new UnauthorizedException();
    }

    await this.savedJobsRepository.remove(savedJob);

    return { message: 'Job deleted successfully' };
  }
}
