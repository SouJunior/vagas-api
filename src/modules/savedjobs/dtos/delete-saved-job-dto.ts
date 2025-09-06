import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteSavedJobDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
