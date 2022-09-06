import { IsIn, IsNotEmpty, IsString } from 'class-validator';

type JobTypeDto = 'Estagio' | 'Trainner' | 'Junior';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Estagio', 'Trainner', 'Junior'])
  type: JobTypeDto;
}
