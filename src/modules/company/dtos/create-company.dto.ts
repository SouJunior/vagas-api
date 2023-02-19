import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome da empresa',
    example: 'Pipomills',
  })
  company_name: string;

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
    example: 'Rua NICKGER no bairro VAJNA',
  })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descrição',
    example: 'Empresa de pipocas',
  })
  description: string;
}
