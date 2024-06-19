import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UpdateMyPasswordDto {
  @IsString({ message: "O campo 'oldPassword' não pode ficar vazio" })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha antiga',
    example: 'Abcd@1234',
  })
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
  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description:
      'A senha precisa ter no mínimo 8 caracteres, máximo de 50, uma letra maiúscula, um número e um símbolo.',
    example: 'Abcd@1234',
  })
  password: string;

  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha precisa ter no mínimo 8 caracteres, máximo de 50, uma letra maiúscula, um número e um símbolo.',
  })
  @ApiProperty({
    description: 'Confirmação de senha de Login',
    example: 'Abcd@1234',
  })
  confirmPassword: string;

  @IsString()
  @ApiProperty({
    description: 'token de recuperação de senha.',
    example: 'algo uuid bem rândomico',
  })
  recoverPasswordToken?: string;
}
