import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Nome da empresa (até 30 caracteres)',
    example: 'Pipomills',
  })
  @IsString({ message: 'O campo companyName deve ser uma string' })
  @IsNotEmpty({ message: 'O campo companyName não pode estar vazio' })
  @MaxLength(30)
  companyName: string;

  @ApiProperty({
    description: 'Email da empresa',
    example: 'pipomills@pipomills.com',
  })
  @IsString({ message: 'O campo email deve ser uma string' })
  @IsNotEmpty({ message: 'O campo email não pode estar vazio' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'CNPJ (formato: xx.xxx.xxx/xxxx-xx)',
    example: '67.979.311/0001-15',
  })
  @IsString({ message: 'O campo cnpj deve ser uma string' })
  @IsNotEmpty({ message: 'O campo cnpj não pode estar vazio' })
  @MaxLength(14)
  @MinLength(14)
  cnpj: string;

  @ApiProperty({
    description:
      'Senha de Login (8 a 20 caracteres, deve conter letras maiúsculas, minúsculas, números e caracteres especiais)',
    example: 'Abcd@1234',
  })
  @IsString({ message: 'O campo password deve ser uma string' })
  @IsNotEmpty({ message: 'O campo password não pode estar vazio' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais',
  })
  @Length(8, 20)
  password: string;

  @ApiProperty({
    description:
      'Confirmação de Senha de Login (8 a 20 caracteres, deve ser idêntica à senha)',
    example: 'Abcd@1234',
  })
  @IsString({ message: 'O campo passwordConfirmation deve ser uma string' })
  @IsNotEmpty({ message: 'O campo passwordConfirmation não pode estar vazio' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A confirmação de senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais',
  })
  @Length(8, 20)
  passwordConfirmation: string;
}
