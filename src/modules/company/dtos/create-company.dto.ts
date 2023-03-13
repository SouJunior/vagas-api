import { IsCNPJ } from '../../../shared/validators/cnpj.validator';

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty({
    description: 'Nome da empresa',
    example: 'Pipomills',
  })
  companyName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email da empresa',
    example: 'pipomills@pipomills.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'linkedIn',
    example: 'linkedIn/Usuárioaqui',
  })
  linkedin: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Endereço',
    example: 'Rua dos Bobos',
  })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descrição',
    example: 'Empresa de pipocas',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(14)
  @MinLength(14)
  @IsCNPJ()
  @ApiProperty({
    description: 'CNPJ',
    example: '67.979.311/0001-15',
  })
  cnpj: string;

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
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Confirmação de Senha de Login',
    example: 'Abcd@1234',
  })
  passwordConfirmation: string;
}
