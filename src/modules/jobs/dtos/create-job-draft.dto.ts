import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { JobsModalityEnum } from '../enums/job-modality.enum';

export class CreateJobDraftDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    required: true,
    description: 'Título da vaga',
    example: 'Desenvolvedor Backend Junior',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    required: true,
    description: 'Área de interesse',
    example: 'Tecnologia',
  })
  interestArea: string;

  @IsNotEmpty()
  @IsEnum(JobsModalityEnum)
  @ApiProperty({
    required: true,
    description: 'Modalidade do trabalho',
    example: JobsModalityEnum.REMOTE,
    enum: [
      JobsModalityEnum.HYBRID,
      JobsModalityEnum.ON_SITE,
      JobsModalityEnum.REMOTE,
    ],
  })
  modality: JobsModalityEnum;

  @ValidateIf((o) => o.modality !== JobsModalityEnum.REMOTE)
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Cidade',
    example: 'São Paulo',
  })
  city?: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999999)
  @ApiProperty({
    required: true,
    description: 'Salário mínimo',
    example: 3000,
  })
  salaryMin: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(999999)
  @ApiProperty({
    required: true,
    description: 'Salário máximo',
    example: 5000,
  })
  salaryMax: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Opção de trabalho remoto',
    example: 'Híbrido 2x por semana',
  })
  remoteWorkOption?: string;

  @IsOptional()
  company_id?: string;
}
