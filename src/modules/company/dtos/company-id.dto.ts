import { IsNotEmpty, IsString } from 'class-validator';

export class CompanyIdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
