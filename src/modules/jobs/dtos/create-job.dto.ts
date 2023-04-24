import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
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
    required: true,
    description: 'Título do trabalho',
    example: 'Desenvolvedor',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(3000)
  @ApiProperty({
    required: true,
    description: 'Descrição do trabalho',
    example: 'Trabalho com vendas',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(3000)
  @ApiProperty({
    required: true,
    description: 'Pre-requisitos para a vaga',
    example: 'Conhecimento em python 3',
  })
  prerequisites: string;

  @IsOptional()
  @IsString()
  @MaxLength(3000)
  @ApiProperty({
    required: false,
    description: 'Beneficios da vaga',
    example: 'Vale alimentação, Auxilio homeofice',
  })
  benefits?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0, allowNaN: false, allowInfinity: false })
  @IsEnum(JobsTypes)
  @ApiProperty({
    required: false,
    description: 'Senioridade da vaga',
    enum: [
      JobsTypes.ANALYST,
      JobsTypes.JUNIOR,
      JobsTypes.TRAINEE,
      JobsTypes.INTERNSHIP,
    ],
    example: JobsTypes.JUNIOR,
  })
  type?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0, allowNaN: false, allowInfinity: false })
  @IsEnum(JobsTypeContractEnum)
  @ApiProperty({
    required: false,
    description: 'Tipo de contrato do trabalho',
    example: JobsTypeContractEnum.CLT,
    enum: [
      JobsTypeContractEnum.CLT,
      JobsTypeContractEnum.PJ,
      JobsTypeContractEnum.OTHER,
    ],
  })
  typeContract?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    example: 'Freelance',
  })
  contractText?: string;

  @IsNumber()
  @IsOptional()
  @Max(99999)
  @Min(0)
  @ApiProperty({
    required: false,
    description: 'Modalidade o valor da remuneração em meses',
    example: 3000,
  })
  salaryMin?: number;

  @IsNumber()
  @IsOptional()
  @Max(99999)
  @Min(0)
  @ApiProperty({
    required: false,
    description: 'Modalidade o valor da remuneração em meses',
    example: 3000,
  })
  salaryMax?: number;

  @IsNotEmpty()
  @IsEnum(JobsModalityEnum)
  @ApiProperty({
    required: true,
    description: 'Modalidade do trabalho',
    example: JobsModalityEnum.REMOTE,
    enum: [
      JobsModalityEnum.HYBRID,
      JobsModalityEnum.IN_PERSON,
      JobsModalityEnum.REMOTE,
    ],
  })
  modality: string;

  @ApiProperty({
    required: false,
    description: 'Informe a unidade federativa',
    example: 'DF',
  })
  @IsOptional()
  @IsString()
  federalUnit?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Cidade do local de trabalho caso a vaga nao seja remota',
    example: 'São Paulo',
  })
  city?: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    required: true,
    description: 'O contrato de trabalho e indefinido?',
    example: true,
  })
  indefinideContract: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Tempo de contrato de trabalho',
    example: '6 Meses',
  })
  contractType?: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    required: true,
    description: 'Verifica se a vaga é afirmativa',
    example: false,
  })
  affirmative: boolean;

  @IsOptional()
  @IsEnum(JobsAffirmativeTypeEnum)
  @ApiProperty({
    required: false,
    description: 'Opções da vaga afirmativa',
    example: JobsAffirmativeTypeEnum.BLACK_BROWN_PERSON,
    enum: [
      JobsAffirmativeTypeEnum.BLACK_BROWN_PERSON,
      JobsAffirmativeTypeEnum.CIS_TRANS_WOMEN,
      JobsAffirmativeTypeEnum.LGBTQIA,
      JobsAffirmativeTypeEnum.SIXTY_PLUS,
      JobsAffirmativeTypeEnum.PWD,
    ],
  })
  affirmativeType?: string;

  @IsOptional()
  @Exclude()
  @IsString()
  company_id?: string;
}
