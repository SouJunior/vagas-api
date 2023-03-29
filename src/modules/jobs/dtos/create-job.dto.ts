import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { JobsAffirmativeTypeEnum } from '../enums/job-affirmative-type.enum';
import { JobsTypeContractEnum } from '../enums/job-contract-type.enum';
import { JobsModalityEnum } from '../enums/job-modality.enum';
import { JobsTypes } from '../enums/job-type.enum';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @ApiProperty({
    description: 'Título do trabalho',
    example: 'Desenvolvedor',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(3000)
  @ApiProperty({
    description: 'Descrição do trabalho',
    example: 'Trabalho com vendas',
  })
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(3000)
  @ApiProperty({
    description: 'Pre-requisitos para a vaga',
    example: 'Conhecimento em python 3',
  })
  prerequisites: string;

  @IsOptional()
  @IsString()
  @MaxLength(3000)
  @ApiProperty({
    description: 'Beneficios da vaga',
    example: 'Vale alimentação, Auxilio homeofice',
  })
  benefits: string;

  @IsNotEmpty()
  @IsEnum(JobsTypes)
  @ApiProperty({
    description: 'Senioridade da vaga',
    enum: [JobsTypes.ANALYST, JobsTypes.JUNIOR, JobsTypes.TRAINEE],
    example: JobsTypes.JUNIOR,
  })
  type: string;

  @IsNotEmpty()
  @IsEnum(JobsTypeContractEnum)
  @ApiProperty({
    description: 'Tipo de contrato do trabalho',
    example: JobsTypeContractEnum.CLT,
    enum: [
      JobsTypeContractEnum.CLT,
      JobsTypeContractEnum.FREELANCE,
      JobsTypeContractEnum.PJ,
      JobsTypeContractEnum.OTHER,
    ],
  })
  typeContract: string;

  @IsNumber()
  @ApiProperty({
    description: 'Modalidade o valor da remuneração em meses',
    example: 3000,
  })
  salaryMin: number;

  @IsNumber()
  @ApiProperty({
    description: 'Modalidade o valor da remuneração em meses',
    example: 3000,
  })
  salaryMax: number;

  @ApiProperty({
    description: 'Informe a unidade federativa',
    example: 'DF',
  })
  @IsOptional()
  @IsString()
  federalUnit: string;

  @IsNotEmpty()
  @IsEnum(JobsModalityEnum)
  @ApiProperty({
    description: 'Modalidade do trabalho',
    example: JobsModalityEnum.REMOTE,
    enum: [
      JobsModalityEnum.HYBRID,
      JobsModalityEnum.IN_PERSON,
      JobsModalityEnum.REMOTE,
    ],
  })
  modality: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      'Cidade e estado do local de trabalho caso a vaga nao seja remota',
    example: 'São Paulo/SP',
  })
  headquarters: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'O contrato de trabalho e indefinido?',
    example: true,
  })
  indefinideContract: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Tempo de contrato de trabalho',
    example: '6 Meses',
  })
  contractType: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Verifica se a vaga é afirmativa',
    example: false,
  })
  affirmative: boolean;

  @IsOptional()
  @IsEnum(JobsAffirmativeTypeEnum)
  @ApiProperty({
    description: 'Opções da vaga afirmativa',
    example: JobsAffirmativeTypeEnum.BLACK_BROWN_PERSON,
    enum: [
      JobsAffirmativeTypeEnum.BLACK_BROWN_PERSON,
      JobsAffirmativeTypeEnum.CIS_TRANS_WOMEN,
      JobsAffirmativeTypeEnum.LGBTQIA,
      JobsAffirmativeTypeEnum.SIXTY_PLUS,
    ],
  })
  affirmativeType?: JobsAffirmativeTypeEnum;

  @IsOptional()
  @IsString()
  company_id?: string;
}
