import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID do trabalho',
    example: 'be02e7b0-238a-44c2-b9db-ccb339d63fc9',
  })
  job_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID do usuário',
    example: 'be02e7b0-238a-44c2-b9db-ccb339d63fc9',
  })
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty({
    description: 'Report do trabalho',
    example: 'Trabalho bem feito!',
  })
  description: string;
}
