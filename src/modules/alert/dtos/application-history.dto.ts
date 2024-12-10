import { ApplicationStatus } from '../../../database/entities/enums/application-status.enum';

export interface ApplicationHistoryDto {
    id: string;
    jobId: string;
    userId: string;
    status: ApplicationStatus;
    createdDT: string;
    jobTitle: string;
    jobDescription: string;
}