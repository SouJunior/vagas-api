import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReportIdDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID do report',
    example: 'be02e7b0-238a-44c2-b9db-ccb339d63fc9',
  })
  id: string;
}
