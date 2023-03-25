import { ApiProperty } from '@nestjs/swagger';
import { LoginTypeEnum } from '../enums/login-type.enum';

export class LoggerUserType {
  @ApiProperty({ example: '218926fe-a3fa-4381-af8e-77c4017ebdb8' })
  id: string;
  @ApiProperty({ example: 'Any Name' })
  name: string;

  @ApiProperty({ example: 'EmailParaTeste@teste.com' })
  email: string;

  @ApiProperty({ example: LoginTypeEnum.USER })
  type: LoginTypeEnum;

  @ApiProperty({ example: true })
  mailConfirm: boolean;

  @ApiProperty({ example: null })
  recoverPasswordToken: string | null;

  @ApiProperty({ example: '2023-03-25T04:40:28.329Z' })
  created_at: Date;

  @ApiProperty({ example: '2023-03-25T04:40:28.329Z' })
  updated_at: Date;

  @ApiProperty({ example: true })
  policies: boolean;

  @ApiProperty({ example: '127.0.0.1' })
  ip: string;
}
