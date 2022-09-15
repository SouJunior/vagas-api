import { IsNotEmpty, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateDenunciationDto {
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
