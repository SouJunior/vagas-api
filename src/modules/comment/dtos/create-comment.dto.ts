import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty({
    description: 'Comentário',
    example: 'Boa!',
  })
  comment: string;

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
    description: 'ID do produto',
    example: 'be02e7b0-238a-44c2-b9db-ccb339d63fc9',
  })
  user_id: string;
}
