import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSavedJobDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  jobId: string;
}