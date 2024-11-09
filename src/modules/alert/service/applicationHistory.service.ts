import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationEntity } from '../../../database/entities/applications.entity';
import { JobsEntity } from '../../../database/entities/jobs.entity';
@Injectable()
export class ApplicationHistoryService {
    constructor(
        @InjectRepository(ApplicationEntity)
        private applicationsRepository: Repository<ApplicationEntity>,
        @InjectRepository(JobsEntity)
        private jobsRepository: Repository<JobsEntity>,
    ) { }
    async getApplicationHistory(userId: string, status?: string, page: number = 1, limit: number = 10): Promise<any[]> {
        const query = this.applicationsRepository.createQueryBuilder('application')
            .where('application.userId = :userId', { userId })
            .leftJoinAndSelect('application.job', 'job');
        if (status) {
            query.andWhere('application.status = :status', { status });
        }
        query.orderBy('application.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const applications = await query.getMany();
        return applications.map(application => ({
            id: application.id,
            jobId: application.job.id,
            userId: application.user_id,
            status: application.status,
            createdAt: application.created_at.toISOString(),
            jobTitle: application.job.title,
            jobDescription: application.job.description,
        }));
    }
}