import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCurriculumDto {
  @IsString()
  @IsNotEmpty()
  key: string;
}
