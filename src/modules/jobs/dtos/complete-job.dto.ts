import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { JobsTypeContractEnum } from '../enums/job-contract-type.enum';

export class CompleteJobDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(5000)
  @ApiProperty({
    required: true,
    description: 'Descrição da vaga',
    example: 'Buscamos um desenvolvedor backend...',
  })
  description: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    required: true,
    description: 'Requisitos da vaga',
    example: ['Node.js', 'TypeScript', 'NestJS'],
  })
  requirements: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    required: false,
    description: 'Benefícios',
    example: ['Vale alimentação', 'Plano de saúde'],
  })
  benefits?: string[];

  @IsNotEmpty()
  @IsEnum(JobsTypeContractEnum)
  @ApiProperty({
    required: true,
    description: 'Tipo de contrato',
    example: JobsTypeContractEnum.CLT,
    enum: [
      JobsTypeContractEnum.CLT,
      JobsTypeContractEnum.PJ,
      JobsTypeContractEnum.OTHER,
    ],
  })
  contractType: JobsTypeContractEnum;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    description: 'Jornada de trabalho',
    example: '40 horas semanais',
  })
  journey: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    required: true,
    description: 'Processo seletivo',
    example: ['Entrevista com RH', 'Teste técnico', 'Entrevista técnica'],
  })
  selectionProcess: string[];

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  @ApiProperty({
    required: false,
    description: 'Informações adicionais',
    example: 'Início imediato',
  })
  additionalInfo?: string;
}
