import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  comment: string;

  @IsString()
  @IsNotEmpty()
  job_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}
