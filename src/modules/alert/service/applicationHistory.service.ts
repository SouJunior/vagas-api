import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationEntity } from '../../../database/entities/applications.entity';
import { ApplicationHistoryDto } from '../dtos/application-history.dto';
import { ApplicationStatus } from 'src/database/entities/enums/application-status.enum';

@Injectable()
export class ApplicationHistoryService {
    constructor(
        @InjectRepository(ApplicationEntity)
        private applicationsRepository: Repository<ApplicationEntity>,
        
    ) { }
    async getApplicationHistory(
        userId: string, 
        status?: ApplicationStatus,
        page: number = 1, 
        limit: number = 10
    ): Promise<ApplicationHistoryDto[]> {
        const applications = await this.applicationsRepository.find({
            where: {
                user_id: userId, 
                ...(status && { status }),
            },
            relations: ['job'], 
            order: { 
                created_date_time: 'DESC', 
            },
            skip: (page -1) *limit,
            take:limit, 
        });
       
        return applications.map(application => ({
            id: application.id,
            jobId: application.job.id,
            userId: application.user_id,
            status: application.status,
            createdDT: application.created_date_time.toISOString(),
            jobTitle: application.job.title,
            jobDescription: application.job.description,
        }));
    }
}