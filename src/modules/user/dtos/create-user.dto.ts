import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  MaxLength,
  IsEmail,
  Matches,
  Validate,
  Equals,
} from 'class-validator';
import { UserRole } from '../../../shared/utils/userRole/userRole';

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
  @IsString()
  @ApiProperty({
    description: 'E-mail do usuário.',
    example: 'johnsnow@outlook.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>.]{8,}$/,
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
  @Validate((value, { object }) => value === object.password, {
    message: 'Senhas precisam ser idênticas',
  })
  confirmPassword: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Termo de aceite, para ser criado o usuário tem de ser aceito',
    example: true,
  })
  @Equals(true, { message: 'Termo de aceite deve ser aceito' })
  policies: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Endereço de IP do usuário',
    example: '123.456.789.0',
  })
  ip: string;

  @IsOptional()
  @IsEnum(UserRole)
  type: UserRole;
}
