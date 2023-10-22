import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { Match } from '../dtos/decorators/match.decorator';

export class UpdateMyPasswordDto {
  @ApiProperty({
    description: 'Senha atual',
    example: 'Abcd@1234',
  })
  @IsString({ message: 'O campo oldPassword deve ser uma string' })
  @IsNotEmpty({ message: "O campo 'oldPassword' não pode ficar vazio" })
  oldPassword: string;

  @ApiProperty({
    description: 'Nova senha de login',
    example: 'Abcd@1234',
  })
  @IsString({ message: 'O campo password deve ser uma string' })
  @IsNotEmpty({ message: "O campo 'password' não pode ficar vazio" })
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha precisa ter no mínimo 8 caracteres, máximo de 50, uma letra maiúscula, um número e um símbolo.',
  })
  password: string;

  @ApiProperty({
    description: 'Confirmação da nova senha de login',
    example: 'Abcd@1234',
  })
  @IsString({ message: 'O campo confirmNewPassword deve ser uma string' })
  @IsNotEmpty({ message: "O campo 'confirmNewPassword' não pode ficar vazio" })
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha precisa ter no mínimo 8 caracteres, máximo de 50, uma letra maiúscula, um número e um símbolo.',
  })
  confirmNewPassword: string;
}

export class CreatePasswordHashDto {
  @ApiProperty({
    description:
      'Senha de login (8 a 50 caracteres, com pelo menos uma letra maiúscula, um número e um caractere especial)',
    example: 'Abcd@1234',
  })
  @IsString({ message: 'O campo password deve ser uma string' })
  @IsNotEmpty({ message: "O campo 'password' não pode ficar vazio" })
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha precisa ter no mínimo 8 caracteres, máximo de 50, uma letra maiúscula, um número e um símbolo.',
  })
  password: string;

  @ApiProperty({
    description: 'Confirmação de senha (deve ser idêntica à senha)',
    example: 'Abcd@1234',
  })
  @IsString({ message: 'O campo confirmPassword deve ser uma string' })
  @IsNotEmpty({ message: "O campo 'confirmPassword' não pode ficar vazio" })
  @Match('password', {
    message: 'Os campos de senha precisam ser idênticos.',
  })
  confirmPassword: string;

  @ApiProperty({
    description: 'Token de recuperação de senha (opcional)',
    example: 'algum UUID aleatório',
  })
  @IsString({ message: 'O campo recoverPasswordToken deve ser uma string' })
  recoverPasswordToken?: string;
}
