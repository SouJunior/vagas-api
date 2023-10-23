import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({
    description: 'ID do trabalho a ser relatado',
    example: 'be02e7b0-238a-44c2-b9db-ccb339d63fc9',
  })
  @IsString({ message: 'O campo job_id deve ser uma string' })
  @IsNotEmpty({ message: 'O campo job_id não pode estar vazio' })
  job_id: string;

  @ApiProperty({
    description: 'ID do usuário que está fazendo o relatório',
    example: 'be02e7b0-238a-44c2-b9db-ccb339d63fc9',
  })
  @IsString({ message: 'O campo user_id deve ser uma string' })
  @IsNotEmpty({ message: 'O campo user_id não pode estar vazio' })
  user_id: string;

  @ApiProperty({
    description: 'Descrição do relatório (mínimo de 10 caracteres)',
    example: 'Trabalho bem feito!',
  })
  @IsString({ message: 'O campo description deve ser uma string' })
  @IsNotEmpty({ message: 'O campo description não pode estar vazio' })
  @MinLength(10)
  description: string;
}
