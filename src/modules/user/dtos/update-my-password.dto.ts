import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UpdateMyPasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Inserir senha com os critérios informados',
  })
  @ApiProperty({
    description: 'Senha de Login',
    example: 'Abcd@1234',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Inserir senha com os critérios informados',
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
    description: 'Inserir senha com os critérios informados',
    example: 'Abcd@1234',
  })
  password: string;

  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Inserir senha com os critérios informados',
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
