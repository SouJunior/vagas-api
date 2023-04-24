import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { LoginTypeEnum } from '../enums/login-type.enum';

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'E-mail do usuário.',
    example: 'johnsnow@outlook.com',
  })
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(8, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha de Login',
    example: 'Abcd@1234',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    enum: LoginTypeEnum,
    example: LoginTypeEnum.COMPANY,
  })
  @IsEnum(LoginTypeEnum, { message: 'Opções de type COMPANY e USER' })
  @IsNotEmpty()
  type: LoginTypeEnum;
}
