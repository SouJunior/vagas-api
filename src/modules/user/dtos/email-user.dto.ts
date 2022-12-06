import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class EmailUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}