import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @IsNotEmpty()
  job_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;
}
