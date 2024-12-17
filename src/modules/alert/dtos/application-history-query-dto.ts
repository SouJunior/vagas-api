import { IsEnum, IsInt, Min, IsOptional } from 'class-validator';
import { ApplicationStatus } from '../../../database/entities/enums/application-status.enum';

export class ApplicationHistoryQueryDto {
  @IsOptional()
  @IsEnum(ApplicationStatus, { message: 'Status must be PENDING, APPROVED, or REJECTED' })
  status?: ApplicationStatus;

  @IsOptional()
  @IsInt({ message: 'Page must be an integer' })
  @Min(1, { message: 'Page must be greater than 0' })
  page?: number;

  @IsOptional()
  @IsInt({ message: 'Limit must be an integer' })
  @Min(1, { message: 'Limit must be greater than 0' })
  limit?: number;
}
