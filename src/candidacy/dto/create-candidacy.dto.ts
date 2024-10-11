import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateCandidacyDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  jobId: string;
}
