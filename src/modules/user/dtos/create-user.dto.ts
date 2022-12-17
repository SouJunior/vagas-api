import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../../../shared/utils/userRole/userRole';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsOptional()
  @IsEnum(UserRole)
  type: UserRole;
}
