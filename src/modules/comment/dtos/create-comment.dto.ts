import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  comment: string;

  @IsNumber()
  @IsNotEmpty()
  job_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
