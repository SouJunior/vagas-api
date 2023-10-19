import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { Match } from '../dtos/decorators/match.decorator';

export class UpdateMyPasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty({ message: "O campo 'password' não pode ficar vazio" })
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha precisa ter no mínimo 8 caracteres, máximo de 50, uma letra maiúscula, um número e um símbolo.',
  })
  @ApiProperty({
    description: 'Senha de Login',
    example: 'Abcd@1234',
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: "O campo 'confirmPassword' não pode ficar vazio" })
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha precisa ter no mínimo 8 caracteres, máximo de 50, uma letra maiúscula, um número e um símbolo.',
  })
  @ApiProperty({
    description: 'Senha de Login',
    example: 'Abcd@1234',
  })
  confirmNewPassword: string;
}

export class CreatePasswordHashDto {
  @IsNotEmpty({ message: "O campo 'password' não pode ficar vazio" })
  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha precisa ter no mínimo 8 caracteres, máximo de 50, uma letra maiúscula, um número e um símbolo.',
  })
  @ApiProperty({
    description: 'Senha de Login',
    example: 'Abcd@1234',
  })
  password: string;

  @IsNotEmpty({ message: "O campo 'confirmPassword' não pode ficar vazio" })
  @IsString()
  @ApiProperty({
    description: 'Confirmação de senha',
    example: 'Abcd@123',
  })
  @Match('password', {
    message: 'Os campos de senha precisam ser idênticos.',
  })
  confirmPassword: string;

  @IsString()
  @ApiProperty({
    description: 'token de recuperação de senha.',
    example: 'algo uuid bem rândomico',
  })
  recoverPasswordToken?: string;
}
