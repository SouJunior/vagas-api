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
} from 'class-validator';
import { UserRole } from '../../../shared/utils/userRole/userRole';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(30)
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
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha de Login',
    example: 'Abcd@1234',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsBoolean()
  policies: boolean;

  @IsOptional()
  @IsEnum(UserRole)
  type: UserRole;
}
