import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
} from 'class-validator';
import { UserRole } from '../../../shared/utils/userRole/userRole';
import { Match } from '../decorators/match.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  @ApiProperty({
    description: 'Nome do usuário.',
    example: 'Amaro Francisco',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'E-mail do usuário.',
    example: 'johnsnow@outlook.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsString()
  @MaxLength(128)
  @Matches(/^\S+$/, { message: 'A senha não pode conter espaços em branco.' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Senha inválida. Deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
    },
  )
  @ApiProperty({
    description: 'Senha de Login',
    example: 'Abcd@1234',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Confirmação de senha',
    example: 'Abcd@1234',
  })
  @Match('password', {
    message: 'A confirmação de senha não confere com a senha informada.',
  })
  confirmPassword: string;

  @IsOptional()
  @IsEnum(UserRole)
  type: UserRole;
}
