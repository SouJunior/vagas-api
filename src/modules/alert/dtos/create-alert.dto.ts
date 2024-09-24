import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAlertDto {
  @IsString({ message: 'O campo userId deve ser uma string' })
  @IsNotEmpty({ message: 'O campo userId não pode estar vazio' })
  userId: string;

  @IsString({ message: 'O campo keyword deve ser uma string' })
  @IsNotEmpty({ message: 'O campo keyword não pode estar vazio' })
  keyword: string;

  @IsString({ message: 'O campo location deve ser uma string' })
  @IsNotEmpty({ message: 'O campo location não pode estar vazio' })
  location: string;
}
