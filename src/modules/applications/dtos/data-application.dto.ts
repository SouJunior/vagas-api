import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DataApplicationDto {
  @ApiProperty({ example: '4b9864dc-79cf-4018-96a4-ad82137ba321' })
  @IsString()
  @IsNotEmpty()
  job_id: string;

  @ApiProperty({ example: 'fed50a27-3f51-4642-bfd6-57d5bd3c352a' })
  @IsString()
  @IsNotEmpty()
  curriculum_id: string;
}
