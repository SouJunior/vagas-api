import { IsNotEmpty, IsString } from 'class-validator';

export class ReportIdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
