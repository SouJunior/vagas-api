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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do dono',
    example: 'Julio Cesar',
  })
  owner_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'telefone do dono',
    example: '12345-6789',
  })
  owner_phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID do usuário',
    example: 'be02e7b0-238a-44c2-b9db-ccb339d63fc9',
  })
  user_id: string;
}
