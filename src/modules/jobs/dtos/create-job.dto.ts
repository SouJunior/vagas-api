import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { JobsTypes } from './enum-job-types';

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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID da empresa',
    example: 'be02e7b0-238a-44c2-b9db-ccb339d63fc9',
  })
  company_id: string;

  @IsNotEmpty()
  @IsEnum(JobsTypes)
  @ApiProperty({
    description: 'Tipo do trabalho',
    example: 'Programador',
  })
  type: string;
}
