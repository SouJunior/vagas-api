import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { SavedJobsEntity } from 'src/database/entities/savedjobs.entity';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class SavedJobsCleanerService {
  private readonly logger = new Logger(SavedJobsCleanerService.name);

  constructor(
    @InjectRepository(SavedJobsEntity)
    private readonly savedJobsRepository: Repository<SavedJobsEntity>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanExpiredJobs() {
    const now = new Date();
    const result = await this.savedJobsRepository.delete({
      expiresAt: LessThan(now),
    });

    this.logger.log(`🧹 Removidos ${result.affected} registros expirados.`);
  }
}
