import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { JobsTypes } from './enum-job-types';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  company_id: number;

  @IsNotEmpty()
  @IsEnum(JobsTypes)
  type: string;
}
