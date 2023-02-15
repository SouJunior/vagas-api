import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { JobsContractTimeEnum } from '../enums/job-contract-time.enum';
import { JobsTypeContractEnum } from '../enums/job-contract-type.enum';
import { JobsModalityEnum } from '../enums/job-modality.enum';
import { JobsTypes } from '../enums/job-type.enum';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Título do trabalho',
    example: 'Desenvolvedor',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Descrição do trabalho',
    example: 'Trabalho com vendas',
  })
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Pre-requisitos para a vaga',
    example: 'Conhecimento em python 3',
  })
  prerequisites: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Beneficios da vaga',
    example: 'Vale alimentação, Auxilio homeofice',
  })
  benefits: string;

  @IsNotEmpty()
  @IsEnum(JobsTypes)
  @ApiProperty({
    description: 'Senioridade da vaga',
    enum: [
      JobsTypes.ANALISTA,
      JobsTypes.ESTAGIARIO,
      JobsTypes.JUNIOR,
      JobsTypes.TRAINNER,
    ],
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
    ],
  })
  type_contract: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Modalidade o valor da remuneração em meses',
    example: 3000,
  })
  salary: number;

  @IsNotEmpty()
  @IsEnum(JobsModalityEnum)
  @ApiProperty({
    description: 'Modalidade do trabalho',
    example: JobsModalityEnum.REMOTO,
    enum: [
      JobsModalityEnum.HIBRIDO,
      JobsModalityEnum.PRESENCIAL,
      JobsModalityEnum.REMOTO,
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

  @IsNotEmpty()
  @IsEnum(JobsContractTimeEnum)
  @ApiProperty({
    description: 'Tempo de contrato de trabalho',
    example: JobsContractTimeEnum.Indeterminate,
    enum: [
      JobsContractTimeEnum.Indeterminate,
      JobsContractTimeEnum.OneYearToTwoYear,
      JobsContractTimeEnum.SixMonth,
      JobsContractTimeEnum.SixMonthToOneYear,
    ],
  })
  contract_time: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Verifica se a vaga é afirmativa',
    example: false,
  })
  affirmative: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Opções da vaga afirmativa',
    example: 'PCD,Pessoa preta ou parda',
  })
  affirmative_type: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID da empresa',
    example: 'be02e7b0-238a-44c2-b9db-ccb339d63fc9',
  })
  company_id: string;
}
