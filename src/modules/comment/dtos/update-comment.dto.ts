import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateCommentDto {
  @IsString({ message: 'O campo comment deve ser uma string' })
  @IsNotEmpty({ message: 'O campo comment não pode estar vazio' })
  @MaxLength(500)
  comment: string;
}
