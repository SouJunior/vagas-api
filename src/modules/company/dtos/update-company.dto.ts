import { PartialType } from '@nestjs/mapped-types';
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
  @IsOptional()
  @IsString()
  companyType?: string;

  @IsOptional()
  @IsString()
  @IsEnum(CompanySizeEnum)
  companySize?: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsObject()
  OtherSite: {
    instagran: string;
    linkedin: string;
    twitter: string;
  };

  @IsOptional()
  @IsString()
  companySite?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsString()
  profile?: string;

  @IsOptional()
  @IsString()
  profileKey?: string;

  @IsOptional()
  file: any;
}
