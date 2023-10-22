import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReportIdDto {
  @ApiProperty({
    description: 'ID do relatório',
    example: 'be02e7b0-238a-44c2-b9db-ccb339d63fc9',
  })
  @IsString({ message: 'O campo id deve ser uma string' })
  @IsNotEmpty({ message: 'O campo id não pode estar vazio' })
  id: string;
}
