import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { JobsModalityEnum } from '../enums/job-modality.enum';

export class GetAllJobsDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Modalidade do trabalho',
    enum: [
      JobsModalityEnum.HYBRID,
      JobsModalityEnum.IN_PERSON,
      JobsModalityEnum.REMOTE,
    ],
  })
  modality: JobsModalityEnum;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Filtro por unidade federal',
    example: 'SP',
  })
  federalUnit: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Filtro por cidade',
    example: 'São Paulo',
  })
  city: string;
}
