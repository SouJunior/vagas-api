import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comentário (até 500 caracteres)',
    example: 'Boa!',
  })
  @IsString({ message: 'O campo comment deve ser uma string' })
  @IsNotEmpty({ message: 'O campo comment não pode estar vazio' })
  @MaxLength(500)
  comment: string;

  @ApiProperty({
    description: 'ID do trabalho',
    example: 'be02e7b0-238a-44c2-b9db-ccb339d63fc9',
  })
  @IsString({ message: 'O campo job_id deve ser uma string' })
  @IsNotEmpty({ message: 'O campo job_id não pode estar vazio' })
  job_id: string;

  @ApiProperty({
    description: 'ID do usuário',
    example: 'be02e7b0-238a-44c2-b9db-ccb339d63fc9',
  })
  @IsString({ message: 'O campo user_id deve ser uma string' })
  @IsNotEmpty({ message: 'O campo user_id não pode estar vazio' })
  user_id: string;
}
