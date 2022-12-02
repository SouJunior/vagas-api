import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  job_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;
}
