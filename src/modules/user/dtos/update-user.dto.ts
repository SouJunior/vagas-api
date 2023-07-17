import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: true, example: '11111111111' })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsNotEmpty()
  @IsString()
  mainPhone: string;

  @ApiProperty({ required: false, example: '11111111111' })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({ required: true, example: 'Rio Branco' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ required: true, example: 'Acre' })
  @IsNotEmpty()
  @IsString()
  state: string;
}
