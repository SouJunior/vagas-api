import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { JobsTypes } from './enum-job-types';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  company_id: string;

  @IsNotEmpty()
  @IsEnum(JobsTypes)
  type: string;
}
