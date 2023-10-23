import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCurriculumDto {
  @ApiProperty({
    example: '1235689523635479',
    description: 'Chave do currículo a ser excluído',
  })
  @IsString({ message: 'O campo key deve ser uma string' })
  @IsNotEmpty({ message: 'O campo key não pode estar vazio' })
  key: string;
}
