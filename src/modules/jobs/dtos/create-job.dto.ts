import { IsNotEmpty, IsString } from 'class-validator';
import { JobsTypes } from './enum-job-types';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  type: JobsTypes;
}
