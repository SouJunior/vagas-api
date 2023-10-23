import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CompanySizeEnum } from '../enum/company-size.enum';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @ApiProperty({
    description: 'Tipo de empresa (por exemplo: "Empresa de Tecnologia")',
    example: 'Empresa de Tecnologia',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O campo companyType deve ser uma string' })
  companyType?: string;

  @ApiProperty({
    description: 'Porte da empresa (por exemplo: "BIG_SIZE")',
    example: CompanySizeEnum.BIG_SIZE,
    enum: CompanySizeEnum,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O campo companySize deve ser uma string' })
  @IsEnum(CompanySizeEnum)
  companySize?: string;

  @ApiProperty({
    description: 'Localização da empresa (por exemplo: "SP")',
    example: 'SP',
  })
  @IsNotEmpty({ message: 'O campo uf não pode estar vazio' })
  @IsString({ message: 'O campo uf deve ser uma string' })
  uf: string;

  @ApiProperty({
    description: 'Redes sociais da empresa',
    example: {
      instagran: 'https://www.instagram.com/suaempresa',
      linkedin: 'https://www.linkedin.com/suaempresa',
      twitter: 'https://www.twitter.com/suaempresa',
    },
    required: false,
  })
  @IsOptional()
  @IsObject()
  otherSite: {
    instagran: string;
    linkedin: string;
    twitter: string;
  };

  @ApiProperty({
    description: 'Site da empresa (por exemplo: "www.soujunior.com.br")',
    example: 'www.soujunior.com.br',
  })
  @IsOptional()
  @IsString({ message: 'O campo companySite deve ser uma string' })
  companySite?: string;

  @ApiProperty({
    description: 'Descrição da empresa (até 2000 caracteres)',
    example: 'Breve Descrição da Empresa',
  })
  @IsOptional()
  @IsString({ message: 'O campo description deve ser uma string' })
  @MaxLength(2000)
  description?: string;

  @ApiProperty({
    description: 'Imagem do perfil da empresa',
  })
  @IsOptional()
  @IsString({ message: 'O campo profile deve ser uma string' })
  profile?: string;

  @ApiProperty({
    description: 'Chave para remoção da imagem do perfil',
  })
  @IsOptional()
  @IsString({ message: 'O campo profileKey deve ser uma string' })
  profileKey?: string;

  @IsOptional()
  file: any;
}
